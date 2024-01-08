"use client";

import { Eye, Lock, Settings, User } from "lucide-react";

import { useUserToken } from "@/hooks/use-user-token";
import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Bio } from "./bio";
import { Header, HeaderSkeleton } from "./header";
import { Info } from "./info";
import { ProfileCard } from "./profile-card";
import { AccountCard } from "./account-card";

import {
  ElementRef,
  FormEvent,
  startTransition,
  useRef,
  useState,
} from "react";
import { updateUser } from "@/server/user";
import { toast } from "../ui/use-toast";
import { revalidatePath } from "next/cache";

type CustomUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image: string;
  role: string;
};

interface ProfileProps {
  user: CustomUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [username, setUsername] = useState<string>(user.username);
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastName] = useState<string>(user.last_name);

  const { identity } = useUserToken(user.id);

  const ownerAsUser = `owner-${user.id}`;
  const isOwner = identity === ownerAsUser;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        username: username,
        first_name: firstName,
        last_name: lastName,
      })
        .then(() => {
          // TODO: Dynamically render updated info
          toast({ title: "Profile updated" });
          closeRef?.current?.click?.();

          // TODO: Fix revalidation || change url
          revalidatePath(`/account/${username}`);
          revalidatePath(`/${username}`);
        })
        .catch(() => {
          toast({ title: "Something went wrong" });
        });
    });
  };

  return (
    <MaxWidthWrapper className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
      {/* TODO: Add user banner here */}
      {!isOwner && (
        <>
          <Header
            username={user.username}
            image={user.image}
            role={user.role}
          />
          <Info
            userId={user.id}
            username={user.username}
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
            identity={identity}
            image={user.image}
          />
          <Bio
            username={user.username}
            userId={user.id}
            identity={identity}
            bio={user.bio}
          />
        </>
      )}
      {isOwner && (
        <Tabs defaultValue="profile" className="mt-2 w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
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
              initialUsername={user.username}
              initialFirstName={user.first_name}
              initialLastName={user.last_name}
              initialImage={user.image}
            />
          </TabsContent>

          <TabsContent value="account">
            <AccountCard username={user.username} initialEmail={user.email} />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Customize your experience here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-end">
                <Button type="submit" variant="outline">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </MaxWidthWrapper>
  );
};

export const ProfileSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <HeaderSkeleton />
        </div>
        <div className="col-span-1 bg-background">
          <Skeleton />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
