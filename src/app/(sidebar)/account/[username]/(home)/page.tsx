import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { getSelfByUsername } from "@/lib/auth-service";

import { Profile } from "@/components/profile";

type CustomUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image: string;
  role: string;
};

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
