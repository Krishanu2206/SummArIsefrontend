"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/submit-button";
import { StrapiErrorsProps } from "@/types/errors";
import { generateSummaryService } from "@/data/services/summary-service";
import { isValidYouTubeUrl } from "@/lib/youtube";

import { createSummaryAction } from "@/data/actions/summary-actions";

const INITIAL_STATE = {
  message: null,
  name: "",
  status : null,
};

export function SummaryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formdata = new FormData(event.currentTarget);
    const videoId = formdata.get("videoId") as string;

    const isValid = isValidYouTubeUrl(videoId); //to check if the videoid is valid
    console.log(isValid, "Processed Video ID");
    
    if (isValid===false) {
      toast.error("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
        status : 401
      });
      return;
    }

    toast.info("Generating summary...");

    const summaryResponseData = await generateSummaryService(videoId);
    console.log(summaryResponseData.data, "Response from route handler");

    if (summaryResponseData.error) {
      setValue("");
      toast.error(summaryResponseData.error);
      setError({
        ...INITIAL_STATE,
        message: summaryResponseData.error,
        name: "Summary Error",
        status : 401
      });
      setLoading(false);
      return;
    }

    const summarypayload= {
      data : {
        videoId : videoId,
        title : `Summary for video: ${videoId}`,
        summary : summaryResponseData.data as string
      }
    }

    try {
      await createSummaryAction(summarypayload);

      toast.success("Summary Created");
      
      setValue("");
      setError(INITIAL_STATE);
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred while creating the summary";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
      setError({
        message: errorMessage,
        name: "Summary Error",
        status : 401
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }

  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn(
            "w-full focus:text-black focus-visible:ring-pink-500",
            errorStyles
          )}
          required
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
}