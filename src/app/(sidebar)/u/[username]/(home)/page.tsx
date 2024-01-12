import { CustomUser } from "@/types/types";
import { getSelfByUsername } from "@/lib/auth-service";
import { Profile } from "@/components/profile";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = (await getSelfByUsername(params.username)) as CustomUser;

  return <Profile user={user} />;
};

export default Page;
