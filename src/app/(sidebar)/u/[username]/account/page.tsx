import { CustomUser } from "@/types/types";
import { getSelfByUsername } from "@/lib/auth-service";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Account } from "./_components/account";

interface AccountPageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: AccountPageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <Account user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
