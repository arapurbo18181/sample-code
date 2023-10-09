import { FieldArray, Form, Formik, FormikErrors, FormikProps } from "formik";
import { IconsLibrary } from "shared/IconsLibrary";
import {
  Button,
  Checkbox,
  Input,
  RadioButton,
  Select,
  TextArea,
} from "shared/ui";
import * as Yup from "yup";
import { IAdvanceForm, IEducation, IEnglishScores, IWorkExp } from "..";
import { useCreateEnquiryAdvanceMutation } from "../storage";

enum EnglishExamNames {
  IELTS = "IELTS",
  PTE = "PTE",
  TOFEL = "TOFEL",
}

type FieldArrayRenderProps<T, V> = {
  form: FormikProps<V>;
  push: (item: T) => void;
  pop: () => void;
  remove: (index: number) => void;
};

const initialValues = {
  EssentialDetails: {
    FirstName: "",
    MiddleName: "",
    LastName: "",
    EmailId: "",
    MobileNo: "",
    CountryCode: "",
    Nationality: "",
    CurrentCountry: "",
    Gender: "",
    DateOfBirth: "",
    DestinationCountry: "",
    VisaType: "",
    EnquiryMessage: "",
    EnquirySource: 0,
  },
  MetaData: {
    IsDependentIncluded: false,
    TotalDependents: 0,
    ApplicationStatus: 0,
    CurrentVisaType: "",
    VisaExpiryDate: "",
    CurrentImmigrationStatus: {
      CitizenshipCountry: "",
    },
    Education: [
      {
        DegreeLevel: "",
        InstituteName: "",
        Country: "",
        YearOfCompletion: "",
      },
    ],
    EnglishScores: [
      {
        ExamName: "",
        ExamDate: "",
        ListeningScore: "",
        ReadingScore: "",
        WritingScore: "",
        SpeakingScore: "",
        OverallScore: "",
      },
    ],
    IsWorkExp: true,
    WorkExperience: [
      {
        JobType: "",
        CompanyName: "",
        Designation: "",
        Location: "",
        StartDate: "",
        EndDate: "",
        CurrentlyWorkingHere: false,
      },
    ],
  },
};

const workExperienceSchemaYes = Yup.object().shape({
  JobType: Yup.string().required("Job Type is required"),
  CompanyName: Yup.string().required("Company Name is required"),
  Designation: Yup.string().required("Designation is required"),
  Location: Yup.string().required("Location is required"),
  StartDate: Yup.string().required("Start Date is required"),
  EndDate: Yup.string().test(
    "oneOfRequired",
    "End Date is required",
    function (value) {
      if (this.parent.CurrentlyWorkingHere === true && !value) {
        return true;
      } else if (this.parent.CurrentlyWorkingHere === false) {
        return false;
      } else if (value) {
        return false;
      }
    }
  ),
  CurrentlyWorkingHere: Yup.boolean().required(
    "Currently Working Here is required"
  ),
});

const validationSchema = Yup.object({
  EssentialDetails: Yup.object().shape({
    FirstName: Yup.string().required("First Name is Required"),
    LastName: Yup.string().required("Last Name is Required"),
    MobileNo: Yup.number()
      .integer("Phone No. must be a number")
      .required("Phone Number is Required"),
    EmailId: Yup.string()
      .email("Invalid EmailId Format")
      .required("EmailId is Required"),
    DateOfBirth: Yup.string().required("Date of Birth is Required"),
    Gender: Yup.string().required("Gender is Required"),
    CurrentCountry: Yup.string().required("Country Of Residence is Required"),
    Nationality: Yup.string().required("Nationality is Required"),
    DestinationCountry: Yup.string().required("Migrate is Required"),
    VisaType: Yup.string().required("Visa Type is Required"),
    EnquiryMessage: Yup.string().required("Enquiry Message is Required"),
  }),
  MetaData: Yup.object().shape({
    IsDependentIncluded: Yup.boolean().required("Required"),
    TotalDependents: Yup.number().test(
      "oneOfRequired",
      "Current Visa Type required",
      function (value) {
        if (this.parent.IsDependentIncluded === true && !value) {
          return false;
        } else if (this.parent.IsDependentIncluded === false) {
          return true;
        } else if (value) {
          return true;
        }
      }
    ),
    CurrentVisaType: Yup.string().test(
      "oneOfRequired",
      "Current Visa Type required",
      function (value) {
        if (this.parent.ApplicationStatus === 0 && !value) {
          return false;
        } else if (
          this.parent.ApplicationStatus === 1 ||
          this.parent.ApplicationStatus === 2
        ) {
          return true;
        } else if (value) {
          return true;
        }
      }
    ),
    VisaExpiryDate: Yup.string().test(
      "oneOfRequired",
      "Visa Expiry Date required",
      function (value) {
        if (this.parent.ApplicationStatus === 0 && !value) {
          return false;
        } else if (
          this.parent.ApplicationStatus === 1 ||
          this.parent.ApplicationStatus === 2
        ) {
          return true;
        } else if (value) {
          return true;
        }
      }
    ),
    CurrentImmigrationStatus: Yup.object().shape({
      CitizenshipCountry: Yup.string().required(
        "Citizenship Country is Required"
      ),
    }),
    EnglishScores: Yup.lazy((value) => {
      if (!value || (value && value.length == 0))
        return Yup.array().notRequired();

      return Yup.array().of(
        Yup.object().shape({
          ExamName: Yup.string().required("Exam Name is required"),
          ExamDate: Yup.string().required("Exam Date is required"),
          ListeningScore: Yup.string().required("Listening Scoreis required"),
          ReadingScore: Yup.string().required("Reading Score is required"),
          WritingScore: Yup.string().required("WritingScore is required"),
          SpeakingScore: Yup.string().required("Speaking Score is required"),
          OverallScore: Yup.string().required("Overall Score is required"),
        })
      );
    }),
    Education: Yup.array().of(
      Yup.object().shape({
        DegreeLevel: Yup.string().required("Degree Level is required"),
        InstituteName: Yup.string().required("Institute Name is required"),
        Country: Yup.string().required("Country is required"),
        YearOfCompletion: Yup.string().required(
          "Year of Completion is required"
        ),
      })
    ),
    IsWorkExp: Yup.boolean()
      .required("Work Experience is required")
      .default(true),
    WorkExperience: Yup.array().when("IsWorkExp", {
      is: true,
      then: (s) => s.of(workExperienceSchemaYes),
      otherwise: (s) => s.notRequired(),
    }),
  }),
});

const AdvanceForm = () => {
  const { mutateAsync: create, isLoading } = useCreateEnquiryAdvanceMutation();

  const onFormSubmit = async (values: IAdvanceForm) => {
    console.log(values);
    await create({
      values: {
        EssentialDetails: values.EssentialDetails,
        MetaData: {
          IsDependentIncluded: values.MetaData.IsDependentIncluded,
          TotalDependents: values.MetaData.TotalDependents,
          ApplicationStatus: values.MetaData.ApplicationStatus,
          CurrentVisaType: values.MetaData.CurrentVisaType
            ? values.MetaData.CurrentVisaType
            : "",
          VisaExpiryDate: values.MetaData.VisaExpiryDate
            ? values.MetaData.VisaExpiryDate
            : "",
          CurrentImmigrationStatus: {
            CitizenshipCountry:
              values.MetaData.CurrentImmigrationStatus.CitizenshipCountry,
          },
          Education: values.MetaData.Education,
          EnglishScores: values.MetaData.EnglishScores,
          IsWorkExp: values.MetaData.IsWorkExp,
          WorkExperience:
            values.MetaData.WorkExperience[0].JobType === ""
              ? []
              : values.MetaData.WorkExperience,
        },
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
      validateOnBlur={true}
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        setFieldValue,
        handleBlur,
        resetForm,
      }) => (
        <Form className="space-y-10 pb-10 font-Inter px-10 bg-gray-100 py-5">
          <div className="border rounded-lg py-8 px-6 space-y-5 bg-white">
            <h2 className="text-gray-900 text-xl font-bold">
              Personal Details
            </h2>
            <div className="grid grid-cols-3 gap-10 ">
              <Input
                error={
                  touched.EssentialDetails?.FirstName &&
                  errors.EssentialDetails?.FirstName
                    ? errors.EssentialDetails?.FirstName
                    : ""
                }
                state={
                  touched.EssentialDetails?.FirstName &&
                  errors.EssentialDetails?.FirstName
                    ? "failure"
                    : undefined
                }
                placeholder="eg. John"
                label="First Name"
                name="EssentialDetails.FirstName"
                value={values.EssentialDetails.FirstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Middle Name"
                name="EssentialDetails.MiddleName"
                placeholder="eg. R."
                value={values.EssentialDetails.MiddleName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                error={
                  touched.EssentialDetails?.LastName &&
                  errors.EssentialDetails?.LastName
                    ? errors.EssentialDetails?.LastName
                    : ""
                }
                state={
                  touched.EssentialDetails?.LastName &&
                  errors.EssentialDetails?.LastName
                    ? "failure"
                    : undefined
                }
                label="Last Name"
                placeholder="eg. Doe"
                value={values.EssentialDetails.LastName}
                name="EssentialDetails.LastName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                error={
                  touched.EssentialDetails?.EmailId &&
                  errors.EssentialDetails?.EmailId
                    ? errors.EssentialDetails?.EmailId
                    : ""
                }
                state={
                  touched.EssentialDetails?.EmailId &&
                  errors.EssentialDetails?.EmailId
                    ? "failure"
                    : undefined
                }
                label="EmailId"
                name="EssentialDetails.EmailId"
                value={values.EssentialDetails.EmailId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                error={
                  touched.EssentialDetails?.MobileNo &&
                  errors.EssentialDetails?.MobileNo
                    ? errors.EssentialDetails?.MobileNo
                    : ""
                }
                state={
                  touched.EssentialDetails?.MobileNo &&
                  errors.EssentialDetails?.MobileNo
                    ? "failure"
                    : undefined
                }
                label="Phone no."
                name="EssentialDetails.MobileNo"
                type="nummber"
                value={values.EssentialDetails.MobileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                error={
                  touched.EssentialDetails?.DateOfBirth &&
                  errors.EssentialDetails?.DateOfBirth
                    ? errors.EssentialDetails?.DateOfBirth
                    : ""
                }
                state={
                  touched.EssentialDetails?.DateOfBirth &&
                  errors.EssentialDetails?.DateOfBirth
                    ? "failure"
                    : undefined
                }
                label="Date Of Birth"
                name="EssentialDetails.DateOfBirth"
                type="date"
                value={values.EssentialDetails.DateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Select
                onChange={(e) => setFieldValue("EssentialDetails.Gender", e)}
                options={[
                  { label: "Select", value: "" },
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                error={
                  touched.EssentialDetails?.Gender &&
                  errors.EssentialDetails?.Gender
                    ? errors.EssentialDetails?.Gender
                    : ""
                }
                label="Gender"
                value={values.EssentialDetails.Gender}
                containerClassName="self-end"
              />
              <Input
                error={
                  touched.EssentialDetails?.CurrentCountry &&
                  errors.EssentialDetails?.CurrentCountry
                    ? errors.EssentialDetails?.CurrentCountry
                    : ""
                }
                state={
                  touched.EssentialDetails?.CurrentCountry &&
                  errors.EssentialDetails?.CurrentCountry
                    ? "failure"
                    : undefined
                }
                label="Country of residence"
                name="EssentialDetails.CurrentCountry"
                value={values.EssentialDetails.CurrentCountry}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Select
                onChange={(e) =>
                  setFieldValue("EssentialDetails.Nationality", e)
                }
                label="Nationality"
                options={[
                  { label: "Select", value: "" },
                  { label: "India", value: "India" },
                  { label: "Australia", value: "Australia" },
                ]}
                error={
                  touched.EssentialDetails?.Nationality &&
                  errors.EssentialDetails?.Nationality
                    ? errors.EssentialDetails?.Nationality
                    : ""
                }
                value={values.EssentialDetails.Nationality}
                containerClassName="self-end"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between items-start border rounded-lg py-8 px-6 bg-white w-1/2 space-y-6">
            <h5 className="text-xs font-normal text-gray-500">
              Have you already applied for a visa or planning to apply for one ?
            </h5>
            <div className="flex justify-center items-center space-x-5 w-full">
              <div className="flex justify-start items-center space-x-5 w-full">
                <RadioButton
                  label="Already Applied"
                  checked={values?.MetaData.ApplicationStatus === 0}
                  onChange={(e) => {
                    if (e) {
                      setFieldValue("MetaData.ApplicationStatus", 0);
                    }
                  }}
                />
                <RadioButton
                  label="Planning to apply"
                  checked={values?.MetaData.ApplicationStatus === 1}
                  onChange={(e) => {
                    if (e) {
                      setFieldValue("MetaData.ApplicationStatus", 1);
                    }
                  }}
                />

                <RadioButton
                  label="Exploring Options"
                  checked={values?.MetaData.ApplicationStatus === 2}
                  onChange={(e) => {
                    if (e) {
                      setFieldValue("MetaData.ApplicationStatus", 2);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start border rounded-lg py-8 px-6 bg-white space-y-6 w-full">
            <h2 className="text-xl font-bold text-gray-900">
              Current Immigration Status
            </h2>
            <div className="w-full">
              <Input
                error={
                  touched.MetaData?.CurrentImmigrationStatus
                    ?.CitizenshipCountry &&
                  errors.MetaData?.CurrentImmigrationStatus?.CitizenshipCountry
                    ? errors.MetaData?.CurrentImmigrationStatus
                        ?.CitizenshipCountry
                    : ""
                }
                state={
                  touched.MetaData?.CurrentImmigrationStatus
                    ?.CitizenshipCountry &&
                  errors.MetaData?.CurrentImmigrationStatus?.CitizenshipCountry
                    ? "failure"
                    : undefined
                }
                label="Country of Citizenship"
                name="MetaData.CurrentImmigrationStatus.CitizenshipCountry"
                value={
                  values.MetaData.CurrentImmigrationStatus.CitizenshipCountry
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">
              <Select
                onChange={(e) => setFieldValue("MetaData.CurrentVisaType", e)}
                label="Current Visa Type"
                options={[
                  { label: "Select", value: "" },
                  { label: "Student Visa", value: "Student Visa" },
                  { label: "Business Visa", value: "Business Visa" },
                ]}
                error={
                  touched.MetaData?.CurrentVisaType &&
                  errors.MetaData?.CurrentVisaType
                    ? errors.MetaData?.CurrentVisaType
                    : ""
                }
                disabled={
                  values.MetaData.ApplicationStatus === 1 ||
                  values.MetaData.ApplicationStatus === 2
                }
                value={values.MetaData.CurrentVisaType}
                containerClassName="self-end"
              />

              <Input
                error={
                  touched.MetaData?.VisaExpiryDate &&
                  errors.MetaData?.VisaExpiryDate
                    ? errors.MetaData.VisaExpiryDate
                    : ""
                }
                disabled={
                  values.MetaData.ApplicationStatus === 1 ||
                  values.MetaData.ApplicationStatus === 2
                }
                state={
                  touched.MetaData?.VisaExpiryDate &&
                  errors.MetaData?.VisaExpiryDate
                    ? "failure"
                    : undefined
                }
                label="Expiry of Visa Type"
                name="MetaData.VisaExpiryDate"
                value={values.MetaData.VisaExpiryDate}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between items-start border rounded-lg py-8 px-6 bg-white space-y-14 w-full">
            <h2 className="text-xl font-bold text-gray-900">
              Immigration Intentions
            </h2>
            <div className="w-full space-y-8">
              <div className="grid grid-cols-2 gap-6 w-full">
                <Select
                  onChange={(e) =>
                    setFieldValue("EssentialDetails.DestinationCountry", e)
                  }
                  label="Migrate to"
                  options={[
                    { label: "Select", value: "" },
                    { label: "New Zealand", value: "New Zealand" },
                    { label: "Australia", value: "Australia" },
                  ]}
                  error={
                    touched.EssentialDetails?.DestinationCountry &&
                    errors.EssentialDetails?.DestinationCountry
                      ? errors.EssentialDetails?.DestinationCountry
                      : ""
                  }
                  value={values.EssentialDetails.DestinationCountry}
                  containerClassName="self-end"
                />
                <Select
                  onChange={(e) =>
                    setFieldValue("EssentialDetails.VisaType", e)
                  }
                  label="Visa Type"
                  options={[
                    { label: "Select", value: "" },
                    { label: "Student Visa", value: "Student Visa" },
                    { label: "Business Visa", value: "Business Visa" },
                  ]}
                  error={
                    touched.EssentialDetails?.VisaType &&
                    errors.EssentialDetails?.VisaType
                      ? errors.EssentialDetails?.VisaType
                      : ""
                  }
                  value={values.EssentialDetails.VisaType}
                  containerClassName="self-end"
                />
              </div>
              <div className="w-full">
                <TextArea
                  rows={10}
                  error={
                    touched.EssentialDetails?.EnquiryMessage &&
                    errors.EssentialDetails?.EnquiryMessage
                      ? errors.EssentialDetails?.EnquiryMessage
                      : ""
                  }
                  state={
                    touched.EssentialDetails?.EnquiryMessage &&
                    errors.EssentialDetails?.EnquiryMessage
                      ? "failure"
                      : undefined
                  }
                  label="EnquiryMessage"
                  name="EssentialDetails.EnquiryMessage"
                  value={values.EssentialDetails.EnquiryMessage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg pt-7 pb-14 px-6 border space-y-12 bg-white">
            <h2 className="text-xl font-bold">Education details</h2>
            <FieldArray name="MetaData.Education">
              {({
                push,
                remove,
                form: {
                  values: {
                    MetaData: { Education },
                  },
                },
              }: FieldArrayRenderProps<IEducation, IAdvanceForm>) => {
                return (
                  <div className="space-y-10 w-full">
                    {Education.map((_: IEducation, index: number) => {
                      const touchedIndex = touched.MetaData?.Education?.[index];
                      const errorIndex = errors.MetaData?.Education?.[
                        index
                      ] as FormikErrors<IEducation>;
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-start items-end space-y-4 w-full"
                        >
                          <div className="flex justify-start items-start space-x-10 w-full relative">
                            <Input
                              label="Name of institute"
                              name={`MetaData.Education[${index}].InstituteName`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              state={
                                touchedIndex?.InstituteName &&
                                errorIndex?.InstituteName
                                  ? "failure"
                                  : undefined
                              }
                              error={
                                touchedIndex?.InstituteName &&
                                errorIndex?.InstituteName
                                  ? errorIndex.InstituteName
                                  : ""
                              }
                              value={
                                values.MetaData.Education[index].InstituteName
                              }
                            />
                            <Input
                              label="Highest Qualification"
                              name={`MetaData.Education[${index}].DegreeLevel`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              state={
                                touchedIndex?.DegreeLevel &&
                                errorIndex?.DegreeLevel
                                  ? "failure"
                                  : undefined
                              }
                              error={
                                touchedIndex?.DegreeLevel &&
                                errorIndex?.DegreeLevel
                                  ? errorIndex.DegreeLevel
                                  : ""
                              }
                              value={
                                values.MetaData.Education[index].DegreeLevel
                              }
                            />
                            <Input
                              label="Passing year"
                              name={`MetaData.Education[${index}].YearOfCompletion`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              state={
                                touchedIndex?.YearOfCompletion &&
                                errorIndex?.YearOfCompletion
                                  ? "failure"
                                  : undefined
                              }
                              error={
                                touchedIndex?.YearOfCompletion &&
                                errorIndex?.YearOfCompletion
                                  ? errorIndex.YearOfCompletion
                                  : ""
                              }
                              value={
                                values.MetaData.Education[index]
                                  .YearOfCompletion
                              }
                            />
                            <>
                              <Input
                                label="Country"
                                name={`MetaData.Education[${index}].Country`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                state={
                                  touchedIndex?.Country && errorIndex?.Country
                                    ? "failure"
                                    : undefined
                                }
                                error={
                                  touchedIndex?.Country && errorIndex?.Country
                                    ? errorIndex.Country
                                    : ""
                                }
                                value={values.MetaData.Education[index].Country}
                              />
                              {index > 0 ? (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  mode="danger"
                                  onClick={() => remove(index)}
                                  className="text-xs absolute -top-0 right-1"
                                >
                                  <IconsLibrary.Delete />
                                </Button>
                              ) : null}
                            </>
                          </div>
                          <div className="flex justify-start items-center space-x-2">
                            {index === values.MetaData.Education.length - 1 ? (
                              <Button
                                type="button"
                                variant="outline"
                                mode="dark"
                                onClick={() =>
                                  push({
                                    DegreeLevel: "",
                                    InstituteName: "",
                                    Country: "",
                                    YearOfCompletion: "",
                                  })
                                }
                                className="text-primary-700 text-xs font-normal rounded flex justify-center items-center space-x-1 border-none shadow-none 
                             hover:bg-transparent hover:text-primary-500 hover:ring-0 hover:outline-none hover:shadow-none mt-1 ml-auto"
                              >
                                <IconsLibrary.Plus />
                                <span>Add Education</span>
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <div className="rounded-lg pt-7 pb-10 px-6 border space-y-5 bg-white">
            <h2 className="text-xl font-bold">Work experience</h2>
            <div className="flex flex-col justify-center items-start space-y-5">
              <h3 className="text-xs font-normal text-gray-500">
                Do you have any work experience ?
              </h3>
              <div className="flex justify-center items-center space-x-5">
                <div className="flex justify-center items-center space-x-2">
                  <RadioButton
                    label="Yes"
                    name="MetaData.IsWorkExp"
                    checked={values.MetaData.IsWorkExp === true}
                    onChange={() => {
                      setFieldValue("MetaData.IsWorkExp", true);
                    }}
                  />
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <RadioButton
                    label="No"
                    name="MetaData.IsWorkExp"
                    checked={values.MetaData.IsWorkExp === false}
                    onChange={() => {
                      setFieldValue("MetaData.IsWorkExp", false);
                    }}
                  />
                </div>
              </div>
              {values.MetaData.IsWorkExp === true && (
                <div className="w-full pb-8">
                  <FieldArray name="MetaData.WorkExperience">
                    {({
                      push,
                      form: {
                        values: {
                          MetaData: { WorkExperience },
                        },
                      },
                    }: FieldArrayRenderProps<IWorkExp, IAdvanceForm>) => {
                      return (
                        <div className="flex flex-col justify-center items-start mt-10 w-full space-y-12">
                          {WorkExperience.map((_, index: number) => {
                            const touchedIndex =
                              touched.MetaData?.WorkExperience?.[index];
                            const errorIndex = errors.MetaData
                              ?.WorkExperience?.[index] as FormikErrors<{
                              JobType: string;
                              CompanyName: string;
                              Designation: string;
                              Location: string;
                              StartDate: string;
                              EndDate: string;
                              CurrentlyWorkingHere: boolean;
                            }>;
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-center space-y-8 w-full"
                              >
                                <div className="relative grid grid-cols-3 gap-10 w-full">
                                  <Select
                                    containerClassName="self-end"
                                    label="Company name"
                                    options={[
                                      { label: "Select", value: "" },
                                      {
                                        label: "Digital Dreams",
                                        value: "Digital Dreams",
                                      },
                                      { label: "Google", value: "Google" },
                                    ]}
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .CompanyName
                                    }
                                    error={
                                      touchedIndex?.CompanyName &&
                                      errorIndex?.CompanyName
                                        ? errorIndex.CompanyName
                                        : ""
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `MetaData.WorkExperience[${index}].CompanyName`,
                                        e
                                      )
                                    }
                                  />
                                  <Input
                                    label="Designation"
                                    name={`MetaData.WorkExperience[${index}].Designation`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .Designation
                                    }
                                    state={
                                      touchedIndex?.Designation &&
                                      errorIndex?.Designation
                                        ? "failure"
                                        : undefined
                                    }
                                    error={
                                      touchedIndex?.Designation &&
                                      errorIndex?.Designation
                                        ? errorIndex.Designation
                                        : ""
                                    }
                                  />
                                  <Select
                                    containerClassName="self-end"
                                    label="In Country"
                                    options={[
                                      { label: "Select", value: "" },
                                      {
                                        label: "New Zealand",
                                        value: "New Zealand",
                                      },
                                      {
                                        label: "Australia",
                                        value: "Australia",
                                      },
                                    ]}
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .Location
                                    }
                                    error={
                                      touchedIndex?.Location &&
                                      errorIndex?.Location
                                        ? errorIndex.Location
                                        : ""
                                    }
                                    onChange={(e) =>
                                      setFieldValue(
                                        `MetaData.WorkExperience[${index}].Location`,
                                        e
                                      )
                                    }
                                  />
                                  <Input
                                    label="Job Type"
                                    name={`MetaData.WorkExperience[${index}].JobType`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .JobType
                                    }
                                    state={
                                      touchedIndex?.JobType &&
                                      errorIndex?.JobType
                                        ? "failure"
                                        : undefined
                                    }
                                    error={
                                      touchedIndex?.JobType &&
                                      errorIndex?.JobType
                                        ? errorIndex.JobType
                                        : ""
                                    }
                                  />
                                  <Input
                                    name={`MetaData.WorkExperience[${index}].StartDate`}
                                    label="Start Date"
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .StartDate
                                    }
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      touchedIndex?.StartDate &&
                                      errorIndex?.StartDate
                                        ? errorIndex.StartDate
                                        : ""
                                    }
                                    state={
                                      touchedIndex?.StartDate &&
                                      errorIndex?.StartDate
                                        ? "failure"
                                        : undefined
                                    }
                                    type="date"
                                  />
                                  <Input
                                    name={`MetaData.WorkExperience[${index}].EndDate`}
                                    label="End Date"
                                    value={
                                      values.MetaData.WorkExperience[index]
                                        .EndDate
                                    }
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                      touchedIndex?.EndDate &&
                                      errorIndex?.EndDate
                                        ? errorIndex.EndDate
                                        : ""
                                    }
                                    disabled={
                                      values.MetaData.WorkExperience.length -
                                        1 ===
                                        index &&
                                      values.MetaData.WorkExperience[index]
                                        .CurrentlyWorkingHere === true
                                    }
                                    state={
                                      touchedIndex?.EndDate &&
                                      errorIndex?.EndDate
                                        ? "failure"
                                        : undefined
                                    }
                                    type="date"
                                  />
                                </div>
                                <div className="flex justify-between items-center w-full">
                                  <div className="flex justify-between items-center space-x-2 w-full">
                                    {index ===
                                    values.MetaData.WorkExperience.length -
                                      1 ? (
                                      <Checkbox
                                        label="Currently Working in this job role ?"
                                        name={`MetaData.WorkExperience[${index}].CurrentlyWorkingHere`} // Fix typo in the name attribute
                                        value={values.MetaData.WorkExperience[
                                          index
                                        ].CurrentlyWorkingHere.toString()}
                                        checked={
                                          values.MetaData.WorkExperience[index]
                                            .CurrentlyWorkingHere === true
                                        }
                                        onChange={() => {
                                          const newValue =
                                            values.MetaData.WorkExperience[
                                              index
                                            ].CurrentlyWorkingHere === false
                                              ? true
                                              : false;

                                          // Update the form field value
                                          setFieldValue(
                                            `MetaData.WorkExperience[${index}].CurrentlyWorkingHere`,
                                            newValue
                                          );
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                  <div className="">
                                    {index ===
                                    values.MetaData.WorkExperience.length -
                                      1 ? (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        mode="dark"
                                        onClick={() =>
                                          push({
                                            JobType: "",
                                            CompanyName: "",
                                            Designation: "",
                                            Location: "",
                                            StartDate: "",
                                            EndDate: "",
                                            CurrentlyWorkingHere: false,
                                          })
                                        }
                                        className="text-primary-700 text-xs font-normal rounded flex justify-center items-center space-x-1 border-none shadow-none 
                                   hover:bg-transparent hover:text-primary-500 hover:ring-0 hover:outline-none hover:shadow-none mt-1 ml-auto"
                                      >
                                        want to add more previous work
                                        experience ?
                                      </Button>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-lg py-8 px-6 space-y-5 bg-white">
            <FieldArray name="MetaData.EnglishScores">
              {({
                push,
                remove,
                form: {
                  values: {
                    MetaData: { EnglishScores },
                  },
                },
              }: FieldArrayRenderProps<IEnglishScores, IAdvanceForm>) => {
                return (
                  <>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex flex-col space-y-2">
                        <h2 className="text-gray-900 text-xl font-bold">
                          English Language Proficiency
                        </h2>
                        <p className="text-sm text-gray-500">
                          Add the English Language Proficiency
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          if (EnglishScores.length >= 3) return;
                          push({
                            ExamName: "",
                            ExamDate: "",
                            ListeningScore: "",
                            ReadingScore: "",
                            WritingScore: "",
                            SpeakingScore: "",
                            OverallScore: "",
                          });
                        }}
                      >
                        Add a English Language
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {EnglishScores.map((_: IEnglishScores, index: number) => {
                        const touchedIndex =
                          touched.MetaData?.EnglishScores?.[index];
                        const errorIndex = errors.MetaData?.EnglishScores?.[
                          index
                        ] as FormikErrors<IEnglishScores>;
                        const previousSelectedCountry =
                          EnglishScores[index - 1]?.ExamName;

                        return (
                          <div key={index} className="space-y-4">
                            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              <div className="w-full">
                                <Select
                                  onChange={(e) =>
                                    setFieldValue(
                                      `MetaData.EnglishScores[${index}].ExamName`,
                                      e
                                    )
                                  }
                                  options={[
                                    {
                                      label: "IELTS",
                                      value: EnglishExamNames.IELTS,
                                      disabled:
                                        previousSelectedCountry ===
                                        EnglishExamNames.IELTS,
                                    },
                                    {
                                      label: "PTE",
                                      value: EnglishExamNames.PTE,
                                      disabled:
                                        previousSelectedCountry ===
                                        EnglishExamNames.PTE,
                                    },
                                    {
                                      label: "TOFEL",
                                      value: EnglishExamNames.TOFEL,
                                      disabled:
                                        previousSelectedCountry ===
                                        EnglishExamNames.TOFEL,
                                    },
                                  ]}
                                  error={
                                    touchedIndex?.ExamName &&
                                    errorIndex?.ExamName
                                      ? errorIndex.ExamName
                                      : ""
                                  }
                                  label="Exam Name"
                                  value={
                                    values.MetaData.EnglishScores[index]
                                      .ExamName
                                  }
                                  containerClassName="self-end"
                                />
                              </div>
                              <div className="w-full">
                                <Input
                                  name={`MetaData.EnglishScores[${index}].ExamDate`}
                                  label="Start Date"
                                  value={
                                    values.MetaData.EnglishScores[index]
                                      .ExamDate
                                  }
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={
                                    touchedIndex?.ExamDate &&
                                    errorIndex?.ExamDate
                                      ? errorIndex.ExamDate
                                      : ""
                                  }
                                  state={
                                    touchedIndex?.ExamDate &&
                                    errorIndex?.ExamDate
                                      ? "failure"
                                      : undefined
                                  }
                                  type="date"
                                />
                              </div>
                            </div>
                            <div
                              key={index}
                              className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                            >
                              <Input
                                name={`MetaData.EnglishScores[${index}].ReadingScore`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Reading"
                                error={
                                  touchedIndex?.ReadingScore &&
                                  errorIndex?.ReadingScore
                                    ? errorIndex.ReadingScore
                                    : ""
                                }
                                state={
                                  touchedIndex?.ReadingScore &&
                                  errorIndex?.ReadingScore
                                    ? "failure"
                                    : undefined
                                }
                                value={
                                  values.MetaData.EnglishScores[index]
                                    .ReadingScore
                                }
                              />
                              <Input
                                name={`MetaData.EnglishScores[${index}].ListeningScore`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Listening"
                                error={
                                  touchedIndex?.ListeningScore &&
                                  errorIndex?.ListeningScore
                                    ? errorIndex.ListeningScore
                                    : ""
                                }
                                state={
                                  touchedIndex?.ListeningScore &&
                                  errorIndex?.ListeningScore
                                    ? "failure"
                                    : undefined
                                }
                                value={
                                  values.MetaData.EnglishScores[index]
                                    .ListeningScore
                                }
                              />
                              <Input
                                name={`MetaData.EnglishScores[${index}].WritingScore`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Writing"
                                error={
                                  touchedIndex?.WritingScore &&
                                  errorIndex?.WritingScore
                                    ? errorIndex.WritingScore
                                    : ""
                                }
                                state={
                                  touchedIndex?.WritingScore &&
                                  errorIndex?.WritingScore
                                    ? "failure"
                                    : undefined
                                }
                                value={
                                  values.MetaData.EnglishScores[index]
                                    .WritingScore
                                }
                              />
                              <Input
                                name={`MetaData.EnglishScores[${index}].SpeakingScore`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Speaking"
                                error={
                                  touchedIndex?.SpeakingScore &&
                                  errorIndex?.SpeakingScore
                                    ? errorIndex.SpeakingScore
                                    : ""
                                }
                                state={
                                  touchedIndex?.SpeakingScore &&
                                  errorIndex?.SpeakingScore
                                    ? "failure"
                                    : undefined
                                }
                                value={
                                  values.MetaData.EnglishScores[index]
                                    .SpeakingScore
                                }
                              />
                              <Input
                                name={`MetaData.EnglishScores[${index}].OverallScore`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Overall"
                                error={
                                  touchedIndex?.OverallScore &&
                                  errorIndex?.OverallScore
                                    ? errorIndex.OverallScore
                                    : ""
                                }
                                state={
                                  touchedIndex?.OverallScore &&
                                  errorIndex?.OverallScore
                                    ? "failure"
                                    : undefined
                                }
                                value={
                                  values.MetaData.EnglishScores[index]
                                    .OverallScore
                                }
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                mode="danger"
                                onClick={() => remove(index)}
                                className="text-xs absolute -top-0 right-1"
                              >
                                <IconsLibrary.Delete />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }}
            </FieldArray>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"></div>
          </div>

          <div className="flex flex-col justify-between items-start border rounded-lg py-8 px-6 bg-white w-1/2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Dependant Applicants Details
            </h2>
            <div className="flex justify-between items-center w-full">
              <div className="flex-1 flex flex-col justify-center items-start space-y-5">
                <h5 className="text-xs font-normal text-gray-500">
                  Do you have dependant applicants ?
                </h5>
                <div className="flex justify-center items-center space-x-5 w-full">
                  <div className="flex justify-start items-center space-x-5 w-full">
                    <RadioButton
                      label="Yes"
                      checked={values.MetaData.IsDependentIncluded === true}
                      onChange={() =>
                        setFieldValue("MetaData.IsDependentIncluded", true)
                      }
                    />

                    <RadioButton
                      label="No"
                      checked={values.MetaData.IsDependentIncluded === false}
                      onChange={(e) => {
                        if (e) {
                          setFieldValue("MetaData.IsDependentIncluded", false);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2 w-full">
                <label className="text-sm font-medium text-gray-900" htmlFor="">
                  No. of applicants
                </label>
                <Select
                  isNumber={true}
                  onChange={(e) => {
                    setFieldValue("MetaData.TotalDependents", e);
                  }}
                  options={[
                    { label: "Select", value: "0" },
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                  ]}
                  error={
                    touched.MetaData?.TotalDependents &&
                    errors.MetaData?.TotalDependents
                      ? errors.MetaData?.TotalDependents
                      : ""
                  }
                  value={String(values.MetaData.TotalDependents)}
                  disabled={values.MetaData.IsDependentIncluded === false}
                  containerClassName="self-end"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center space-x-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="py-1 w-32"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              mode="warning"
              onClick={() => resetForm()}
              className="py-1 w-32"
            >
              Reset
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdvanceForm;
