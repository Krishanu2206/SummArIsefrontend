export interface Image{
    id : number;
    documentId : string;
    url : string;
    name : string | null;
    alternativeText : string | null;
};

export interface HeroSectionLink{
    id : number;
    url : string;
    text : string;
    isExternal : boolean;
};

export interface HeroSectionProps{
    id : number;
    __component: string ;
    heading: string;
    subHeading: string ;
    image: Image;
    link: HeroSectionLink;
}