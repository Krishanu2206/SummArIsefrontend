import { getUserMeLoader } from "@/data/services/getusermeloader";
import { ProfileForm } from "@/components/forms/profile-form";
import { ProfileImageForm } from "@/components/forms/profile-image-form";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  console.log("Profile image(already uploaded)", user.data.image);
  const userData = user.data;
  const userImage = userData?.image;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      Account Page
      <ProfileForm data={userData} className="col-span-3" />
      <ProfileImageForm data={userImage} className="col-span-2" />
    </div>
  );
}