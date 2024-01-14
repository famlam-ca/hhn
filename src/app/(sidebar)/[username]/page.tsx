import { notFound } from "next/navigation";

import { Profile } from "@/components/profile";
import { getUserByUsername } from "@/lib/user-service";
import { CustomUser } from "@/types/types";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = (await getUserByUsername(params.username)) as CustomUser;

  if (!user) {
    notFound();
  }

  return <Profile user={user} />;
};

export default UserPage;
