import { AuthUserProps } from "@/types/auth-types";
import Link from "next/link";
import { LogoutButton } from "../custom/logout-button";

export function LoggedInUser({
  userData,
}: {
  userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.username || userData.email}
      </Link>
      <LogoutButton />
    </div>
  );
}