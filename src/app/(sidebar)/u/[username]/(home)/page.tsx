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

  return (
    <div className="h-full">
      <Profile user={user} />
    </div>
  );
};

export default Page;
