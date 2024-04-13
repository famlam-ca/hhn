import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";
import { EditProfile } from "@/components/profile/edit-profile";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { user } = await getUser({ username: params.username });

  return (
    <MaxWidthWrapper className="mt-5">
      <EditProfile user={user as CustomUser} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
