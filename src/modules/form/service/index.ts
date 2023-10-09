import { ApiInstance, apiEndpoints } from "shared/api";
import { IAdvanceForm } from "..";

export const createEnquiryAdvance = async (body: IAdvanceForm) => {
  const url = apiEndpoints.POST_NEW_ENQUIRY;
  return await ApiInstance.post(url, body);
};
