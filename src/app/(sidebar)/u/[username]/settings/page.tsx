import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EditSettings } from "@/components/profile/edit-settings";
import { getSelfByUsername } from "@/lib/auth-service";
import { CustomUser } from "@/types/types";

interface SettingsPageProps {
  params: {
    username: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <EditSettings user={user} />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
