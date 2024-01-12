import { CustomUser } from "@/types/types";
import { getSelfByUsername } from "@/lib/auth-service";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Profile } from "./_components/profile";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <Profile user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
