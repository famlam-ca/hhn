import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditSettings } from "@/components/profile/edit-settings";
import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

const SettingsPage = async ({ params }: { params: { username: string } }) => {
  const user = (await getSelf({ username: params.username })) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditSettings user={user} />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
