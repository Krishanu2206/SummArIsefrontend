import { getStrapiURL } from "@/lib/strapi-imagehelper";
import { globaldataquery, globalmetadataquery } from "@/queries/globaldataquery";
import { homepagequery } from "@/queries/homepagequery";
import { summaryquery, summarySearchQuery } from "@/queries/summaryquery"

import { getAuthToken } from "./services/get-token";

const baseUrl = getStrapiURL();

async function fetchData(url: string, authToken : string | null) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    if(!response.ok) {
        throw new Error('Error in fetching data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);

  url.search = homepagequery;

  return await fetchData(url.href, null);
}

export async function getGlobalData() {
  const url = new URL("/api/global", baseUrl);

  url.search = globaldataquery

  return await fetchData(url.href, null);
}

export async function getGlobalPageMetadata() {
  const url = new URL("/api/global", baseUrl);

  url.search = globalmetadataquery;

  return await fetchData(url.href, null);
}

export async function getSummaries(queryString : string) {

  const authToken = await getAuthToken();
  if(!authToken) throw new Error("No auth token found");

  const url = new URL("/api/summaries", baseUrl);

  url.search = summarySearchQuery(queryString);

  return await fetchData(url.href, authToken);
}

export async function getSummaryById(summaryId : string) {

  const authToken = await getAuthToken();
  if(!authToken) throw new Error("No auth token found");

  const url = new URL(`/api/summaries/${summaryId}`, baseUrl);

  url.search = summaryquery;

  return await fetchData(url.href, authToken);
}