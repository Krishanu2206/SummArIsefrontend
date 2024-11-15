export interface LogoProps {
  text?: string;
  url? : string;
  dark?: boolean;
}

export interface LogoText {
    id: number;
    text: string;
    url: string;
    isExternal? : boolean
}

export interface CtaButton {
    id: number;
    text: string;
    url: string;
    isExternal? : boolean
}

export interface HeaderProps {
    id : number;
    logoText: LogoText;
    ctaButton: CtaButton;
}