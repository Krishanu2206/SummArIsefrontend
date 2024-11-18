"use server";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";

import { fileDeleteService, fileUploadService } from "../services/file-service";
import { getUserMeLoader } from "../services/getusermeloader";
import { imageSchema } from "@/schemas/profile-image-schema";

export async function updateProfileAction(
  userId : string,
  prevState: any,
  formData: FormData
) {

  const payload = {
    firstName : formData.get("firstName"),
    lastName: formData.get("lastName"),
    bio: formData.get("bio"),
  }

  console.log("updateProfileAction", userId);
  console.log("############################");
  console.log(payload);
  console.log("############################");

  const responseData = await mutateData(
    "PUT",
    `/api/users/${userId}`,
    payload
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Update Profile.",
    };
  }

  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    message: "Profile Updated",
    data: responseData,
    strapiErrors: null,
  };

}

export async function uploadProfileImageAction(
  imageId: string,
  prevState: any,
  formData: FormData
) {

  const user = await getUserMeLoader();
  if (!user.ok)
    throw new Error("You are not authorized to perform this action.");

  const userId = user.data.id;

  const data = {
    image : formData.get("image") as File,
  }
  try {
    console.log("Image info : ", data.image);
  } catch (error) {
    console.error("Error in logging image info:", error);
  }

  // VALIDATE THE IMAGE
  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      data: null,
      message: "Invalid Image",
    };
  }
  console.log("validated image data : ", validatedFields.data);

  // DELETE PREVIOUS IMAGE IF EXISTS
  if (imageId) {
    try {
      await fileDeleteService(imageId);
    } catch (error) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Failed to Delete Previous Image.",
      };
    }
  }

  // UPLOAD NEW IMAGE TO MEDIA LIBRARY
  const fileUploadResponse = await fileUploadService(data.image);
  console.log("File Upload Response : ", fileUploadResponse);
  if (!fileUploadResponse) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (fileUploadResponse.error) {
    return {
      ...prevState,
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      message: "Failed to Upload File.",
    };
  }
  const updatedImageId = fileUploadResponse[0].id;
  const imagepayload = {image : updatedImageId};
  console.log("Updated Image Payload for mutate data : ", imagepayload);

  // UPDATE USER PROFILE WITH NEW IMAGE
  const updateImageResponse = await mutateData(
    "PUT",
    `/api/users/${userId}`,
    imagepayload
  );

  if (!updateImageResponse) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (updateImageResponse.error) {
    return {
      ...prevState,
      strapiErrors:updateImageResponse.error,
      message: "Failed to Update Profile.",
    };
  }

  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    data: updateImageResponse,
    zodErrors: null,
    strapiErrors: null,
    message: "Image Uploaded",
  };
}