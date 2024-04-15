import { validateSession } from "@/lib/lucia";
import { getSelf, getUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

import { AdminEditUserProfile } from "./_components/admin-edit-user-profile";

const EditUserPage = async ({ params }: { params: { username: string } }) => {
  const { user } = await validateSession();
  const self = (await getSelf({ username: user?.username })) as CustomUser;
  const { user: dbUser } = await getUser({ username: params.username });

  return <AdminEditUserProfile user={dbUser as CustomUser} self={self} />;
};

export default EditUserPage;
