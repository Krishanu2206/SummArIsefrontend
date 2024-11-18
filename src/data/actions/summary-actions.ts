"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { redirect } from "next/navigation";

import { SummaryPayload } from "@/types/summary";

export async function createSummaryAction(payload : SummaryPayload) {

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);

  redirect("/dashboard/summaries/" + data.data.documentId);
}