import { LogoText } from "./headertypes";

export interface SocialLink{
    id : number;
    url : string;
    text : string;
    isExternal : boolean;
}

export interface FooterProps{
    id : number;
    text : string;
    logoText  : LogoText;
    socialLink : SocialLink[];
}