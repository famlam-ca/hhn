import { getUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";
import { getSelf } from "@/lib/services/user-service";

import { AdminEditUserProfile } from "./_components/admin-edit-user-profile";
import { validateSession } from "@/lib/auth";

interface EditUserPageProps {
  params: {
    username: string;
  };
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const { user } = await validateSession();
  const self = (await getSelf(user?.username!)) as CustomUser;
  const dbUser = (await getUser({ username: params.username })) as CustomUser;

  return <AdminEditUserProfile user={dbUser} self={self} />;
};

export default EditUserPage;
