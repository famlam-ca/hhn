import { Profile } from "@/components/profile";
import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: PageProps) => {
  const user = (await getSelf(params.username)) as CustomUser;

  return <Profile user={user} />;
};

export default ProfilePage;
