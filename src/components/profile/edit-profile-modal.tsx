"use client";

import { Pencil, Settings, User, UserCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hint } from "@/components/hint";

import { ProfileCard } from "./profile-card";
import { AccountCard } from "./account-card";
import { SettingsCard } from "./settings-card";

interface EditProfileModalProps {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  role: string;
  userTheme: string;
}

export const EditProfileModal = ({
  username,
  first_name,
  last_name,
  email,
  image,
  role,
  userTheme,
}: EditProfileModalProps) => {
  return (
    <Dialog>
      <Hint label="Edit Profile" asChild>
        <DialogTrigger asChild>
          <Button variant="secondary" className="ml-auto">
            <Pencil className="h-5 w-5" />
          </Button>
        </DialogTrigger>
      </Hint>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your account</DialogTitle>
          <DialogDescription>
            Some options will require you to sign out.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="mt-2 w-full">
          <TabsList className="grid w-full grid-cols-3">
            {/* Change */}
            <TabsTrigger value="account">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileCard
              initialUsername={username}
              initialFirstName={first_name}
              initialLastName={last_name}
              initialImage={image}
            />
          </TabsContent>

          <TabsContent value="account">
            <AccountCard initialEmail={email} userRole={role} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsCard userTheme={userTheme} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
