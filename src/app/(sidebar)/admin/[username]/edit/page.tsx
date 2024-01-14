import { getServerSession } from "next-auth";

import { getUserByUsername } from "@/lib/user-service";
import { CustomUser } from "@/types/types";
import { authOptions } from "@/lib/auth-options";
import { getSelfByUsername } from "@/lib/auth-service";

import { AdminEditUserProfile } from "./_components/admin-edit-user-profile";

interface EditUserPageProps {
  params: {
    username: string;
  };
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const session = await getServerSession(authOptions);
  const self = (await getSelfByUsername(session?.user.username!)) as CustomUser;
  const user = (await getUserByUsername(params.username)) as CustomUser;

  return (
    <>
      <AdminEditUserProfile user={user} self={self} />
    </>
  );
};

export default EditUserPage;
