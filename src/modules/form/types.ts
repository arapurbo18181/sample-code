export interface IEducation {
  DegreeLevel: string;
  InstituteName: string;
  Country: string;
  YearOfCompletion: string;
}

export interface IEnglishScores {
  ExamName: string;
  ExamDate: string;
  ListeningScore: string;
  ReadingScore: string;
  WritingScore: string;
  SpeakingScore: string;
  OverallScore: string;
}

export interface IWorkExp {
  JobType: string;
  CompanyName: string;
  Designation: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  CurrentlyWorkingHere: boolean;
}

export interface IAdvanceForm {
  EssentialDetails: {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    EmailId: string;
    MobileNo: string;
    CountryCode: string;
    Nationality: string;
    CurrentCountry: string;
    Gender: string;
    DateOfBirth: string;
    DestinationCountry: string;
    VisaType: string;
    EnquiryMessage: string;
    EnquirySource: number;
  };
  MetaData: {
    IsDependentIncluded: boolean;
    TotalDependents: number;
    ApplicationStatus: number;
    CurrentVisaType: string;
    VisaExpiryDate: string;
    CurrentImmigrationStatus: {
      CitizenshipCountry: string;
    };
    Education: IEducation[];
    EnglishScores: IEnglishScores[];
    IsWorkExp: boolean;
    WorkExperience: IWorkExp[];
  };
}
