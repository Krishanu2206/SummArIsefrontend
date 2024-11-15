import Link from "next/link";
import Logo from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { CtaButton, HeaderProps, LogoText } from "@/types/headertypes";
import { getUserMeLoader } from "@/data/services/getusermeloader";
import { LoggedInUser } from "../helpers/loggedInuser";

export default async function Header({ data } : {data : HeaderProps}) {
    if(!data) {
        return (
            <nav>No Header data</nav>
        )
    }
    
    const user = await getUserMeLoader();
    console.log(user);
    const { logoText, ctaButton } : {logoText : LogoText, ctaButton : CtaButton} = data;
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
        <Logo text={logoText.text} url={logoText.url}/>
        <div className="flex items-center gap-4">
            {user.ok === true ? (
                <LoggedInUser userData={user.data} />
            ) : (
                <Link href={ctaButton.url}>
                <Button>{ctaButton.text}</Button>
                </Link>
            )}
        </div>
        </div>
    );
}