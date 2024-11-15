export interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

export interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}