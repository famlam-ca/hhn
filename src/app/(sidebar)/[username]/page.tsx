import { notFound } from "next/navigation";

import { CustomUser } from "@/types/types";
import { getUserByUsername } from "@/lib/user-service";
import { Profile } from "@/components/profile";

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
