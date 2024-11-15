import { StrapiErrorsProps } from "@/types/errors";

export function StrapiErrors( { error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null;
  return <div className="text-pink-500 text-md italic py-2">{error.message}</div>;
}