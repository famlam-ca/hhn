import { notFound } from "next/navigation";

import { Profile } from "@/components/profile";
import { getUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { user } = await getUser({ username: params.username });

  if (!user) {
    notFound();
  }

  return <Profile user={user as CustomUser} />;
};

export default UserPage;
