import { UseMutationResult, useMutation } from "react-query";
import { APIResponse } from "shared/model";
import { IAdvanceForm, createEnquiryAdvance } from "..";

export const useCreateEnquiryAdvanceMutation = (): UseMutationResult<
  APIResponse<unknown>,
  Error,
  { values: IAdvanceForm }
> => {
  return useMutation(
    async ({ values }: { values: IAdvanceForm }) => {
      return await createEnquiryAdvance(values);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log("API request failed", error);
      },
    }
  );
};
