"use client";
import React from "react";
import { useActionState} from "react";

import { cn } from "@/lib/utils";

import { uploadProfileImageAction } from "@/data/actions/profile-action";
import { SubmitButton } from "@/components/custom/submit-button";
import ImagePicker from "@/components/custom/image-picker";
import { ZodErrors } from "@/components/errors/zod-errors";
import { StrapiErrors } from "@/components/errors/strapi-errors";
import { ProfileImageFormProps } from "@/types/strapi-imagetypes";

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ProfileImageForm({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) {

  console.log("Profile image data(already uploaded) : ", data);

  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id
  );

  const [formState, formAction, isPending] = useActionState(
    uploadProfileImageWithIdAction,
    initialState
  );

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState?.zodErrors?.image} />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Image" loadingText="Saving Image" />
      </div>
    </form>
  );
}