import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { SettingsCard } from "@/components/profile/settings-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  return (
    <MaxWidthWrapper>
      <SettingsCard userTheme={user.theme} />
    </MaxWidthWrapper>
  );
};

export default SettingsPage;
