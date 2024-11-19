import { getAuthToken } from "./get-token";
import { getStrapiURL } from '@/lib/strapi-imagehelper';

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url.href, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (method === 'DELETE') {
      console.log("Mutate data delete result : ", response.ok);
      return response.ok;
    }

    const data = await response?.json();
    console.log("Mutate data upload result : ", data);
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }

}