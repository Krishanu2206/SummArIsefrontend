import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { getStrapiURL } from "@/lib/strapi-imagehelper";

export async function fileDeleteService(imageId: string) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
  console.log("File Delete Response : ", data);
  return data;
}

export async function fileUploadService(image: any) {
  const authToken = await getAuthToken();
  console.log("Auth Token : ", authToken);
  if (!authToken) throw new Error("No auth token found");

  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  console.log("image name : ", image.name);
  formData.append("files", image, image.name);

  try {
    const response = await fetch(url.href, {
      headers: { Authorization: `Bearer ${authToken}` },
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();
    console.log("Image Upload Response : ", dataResponse);
    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}