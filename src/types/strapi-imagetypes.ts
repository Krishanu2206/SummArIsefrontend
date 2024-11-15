export interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export interface ImagePickerProps {
  id : string;
  name : string;
  label : string;
  showCard? : boolean;
  defaultValue? : string;
}

export interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}