import { CustomUser } from "@/types";
import { getSelf } from "@/lib/services/user-service";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditAccount } from "@/components/profile/edit-account";

interface AccountPageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: AccountPageProps) => {
  const user = (await getSelf(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditAccount user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
