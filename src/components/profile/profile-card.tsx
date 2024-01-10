"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { Loader2 } from "lucide-react";

import { updateUser } from "@/server/user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EditProfileImage } from "./edit-profile-image";

interface ProfileCardProps {
  initialUsername: string;
  initialFirstName: string;
  initialLastName: string;
  initialImage: string;
  initialBio: string | null;
}

export const ProfileCard = ({
  initialUsername,
  initialFirstName,
  initialLastName,
  initialImage,
  initialBio,
}: ProfileCardProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [username, setUsername] = useState<string>(initialUsername);
  const [first_name, setFirst_name] = useState<string>(initialFirstName);
  const [last_name, setLast_name] = useState<string>(initialLastName);
  const [bio, setBio] = useState(initialBio || "");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        username: username,
        first_name: first_name,
        last_name: last_name,
        bio: bio,
      })
        .then(() => {
          toast({ title: "Profile updated" });
          closeRef?.current?.click?.();
        })
        .catch(() =>
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          }),
        );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label>Username</Label>
            {/* TODO: Fix error on change || revalidate properly */}
            <Input
              disabled
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="flex items-center justify-between gap-x-6">
            <div className="w-full space-y-2">
              <Label>First name</Label>
              <Input
                disabled={isPending}
                placeholder="First name"
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Last name</Label>
              <Input
                disabled={isPending}
                placeholder="Last name"
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              disabled={isPending}
              placeholder="User bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Edit your profile image</Label>
            <EditProfileImage initialImage={initialImage} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
