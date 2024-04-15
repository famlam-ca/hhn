import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditAccount } from "@/components/profile/edit-account";
import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = (await getSelf({ username: params.username })) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditAccount user={user} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
