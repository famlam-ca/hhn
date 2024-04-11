import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditSettings } from "@/components/profile/edit-settings";
import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

interface SettingsPageProps {
  params: {
    username: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const user = (await getSelf(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditSettings user={user} />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
