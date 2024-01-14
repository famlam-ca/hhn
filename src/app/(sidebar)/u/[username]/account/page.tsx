import { CustomUser } from "@/types/types";
import { getSelfByUsername } from "@/lib/auth-service";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditAccount } from "@/components/profile/edit-account";

interface AccountPageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: AccountPageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditAccount user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
