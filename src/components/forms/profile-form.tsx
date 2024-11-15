"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/custom/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormProps } from "@/types/auth-types";
import { useActionState } from "react";
import { updateProfileAction } from "@/data/actions/profile-action";
import { StrapiErrors } from "../errors/strapi-errors";

function CountBox({ text }: { readonly text: number }) {
  const style = "font-bold text-md mx-1";
  const color = text > 0 ? "text-primary" : "text-red-500";
  return (
    <div className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none">
      You have<span className={cn(style, color)}>{text}</span>credit(s)
    </div>
  );
}

export function ProfileForm({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) {

  const INITIAL_STATE = {
    message : null,
    data : null, 
    strapiErrors : null
  }
  const updateProfileWithId = updateProfileAction.bind(null, data.id);

  const [formState, formAction, isPending] = useActionState(updateProfileWithId , INITIAL_STATE);

  return (
    <form className={`space-y-4 ${className}`} action={formAction}>
      <div className="space-y-4 grid ">
        <div className="grid grid-cols-3 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data?.username || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data?.email || ""}
            disabled
          />
          <CountBox text={data?.credits} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data?.firstName || ""}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data?.lastName || ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data?.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
    </form>
  );
}