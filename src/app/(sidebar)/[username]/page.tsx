import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { Profile } from "@/components/profile/profile";

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
