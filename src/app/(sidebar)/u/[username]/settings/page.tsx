import { CustomUser } from "@/types/types";
import { getSelfByUsername } from "@/lib/auth-service";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { Settings } from "./_components/settings";

interface SettingsPageProps {
  params: {
    username: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return (
    <MaxWidthWrapper className="mt-5">
      <Settings user={user} />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
