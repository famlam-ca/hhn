import { getServerSession } from "next-auth";

import { CustomUser } from "@/types/types";
import { authOptions } from "@/lib/auth-options";
import { getSelfByUsername } from "@/lib/auth-service";
import { Profile } from "@/components/profile";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  const externalUser = session?.user!;
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  if (!user || user.id !== externalUser?.id) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <Profile user={user} />
    </div>
  );
};

export default Page;
