import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getUserByUsername } from "@/lib/user-service";
import { CustomUser } from "@/types/types";
import { EditProfile } from "@/components/profile/edit-profile";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const user = (await getUserByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditProfile user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
