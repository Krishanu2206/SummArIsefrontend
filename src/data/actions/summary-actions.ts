"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { redirect } from "next/navigation";

import { SummaryPayload } from "@/types/summary";
import { revalidatePath } from "next/cache";
import { getSummaryById } from "../loaders";

export async function createSummaryAction(payload : SummaryPayload) {

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);

  redirect("/dashboard/summaries/" + data.data.documentId);
}

export async function updateSummaryAction(prevState : any, formData : FormData){

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const documentId = formData.get("documentId") as string;
  // console.log(formData.get("summary") as string)

  let summary;
  if(formData.get("summary") === null){
    const {data} = await getSummaryById(documentId);
    summary = data.summary;
  }else{
    summary = formData.get("summary");
  }

  const payload = {
    data : {
      title : formData.get("title"),
      summary : summary
    }
  }

  const updateSummaryResponseData = await mutateData("PUT", "/api/summaries/" + documentId, payload);

  if(!updateSummaryResponseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (updateSummaryResponseData.error) {
    return {
      ...prevState,
      strapiErrors: updateSummaryResponseData.error,
      message: "Failed to update summary.",
    };
  }

  revalidatePath("/dashboard/summaries/" + updateSummaryResponseData.data.documentId);

  return {
    ...prevState,
    message: "Summary updated successfully",
    data: updateSummaryResponseData,
    strapiErrors: null,
  };
}

export async function deleteSummaryAction(documentId:string, prevState : any, formData : FormData){

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  // const documentId = formData.get("documentId") as string;

  const deleteSummaryResponseData = await mutateData("DELETE", `/api/summaries/${documentId}`);

  if (!deleteSummaryResponseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (deleteSummaryResponseData.error) {
    return {
      ...prevState,
      strapiErrors: deleteSummaryResponseData.error,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  redirect("/dashboard/summaries");
}