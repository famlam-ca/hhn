import { Profile } from "@/components/profile";
import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = (await getSelf({ username: params.username })) as CustomUser;

  return <Profile user={user} />;
};

export default ProfilePage;
