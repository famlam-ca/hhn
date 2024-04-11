import { EditAccount } from "@/components/profile/edit-account";
import { EditProfile } from "@/components/profile/edit-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomUser } from "@/types";

interface AdminEditUserProfileProps {
  user: CustomUser;
  self: CustomUser;
}

export const AdminEditUserProfile = ({
  user,
  self,
}: AdminEditUserProfileProps) => {
  return (
    <>
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <EditProfile user={user} />
        </TabsContent>
        <TabsContent value="account">
          <EditAccount user={user} self={self} />
        </TabsContent>
      </Tabs>
    </>
  );
};
