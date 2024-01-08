"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Trash } from "lucide-react";

import { updateUser } from "@/server/user";
import { UploadDropzone } from "@/lib/upload-thing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Hint } from "@/components/hint";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileCardProps {
  initialUsername: string;
  initialFirstName: string;
  initialLastName: string;
  initialImage: string;
}

export const ProfileCard = ({
  initialUsername,
  initialFirstName,
  initialLastName,
  initialImage,
}: ProfileCardProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [username, setUsername] = useState<string>(initialUsername);
  const [first_name, setFirst_name] = useState<string>(initialFirstName);
  const [last_name, setLast_name] = useState<string>(initialLastName);
  const [image, setImage] = useState<string>(initialImage);
  const [isPending, startTransition] = useTransition();

  const onRemove = async () => {
    startTransition(() => {
      updateUser({ image: "https://www.famlam.ca/logo/logo512-blue-s.png" })
        .then(() => {
          toast({ title: "Profile image removed" });
          setImage("");
          router.refresh();
          closeRef?.current?.click();
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        username: username,
        first_name: first_name,
        last_name: last_name,
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <>
              <div className="space-y-2">
                <Label>Username</Label>
                {/* TODO: Fix error on change || revalidate properly */}
                <Input
                  disabled
                  placeholder="Username"
                  onChange={onChange}
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
                <Label>Edit your profile image</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative aspect-square h-52 w-52 overflow-hidden rounded-full border border-accent">
                      <Image
                        src={image}
                        alt="Profile image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Edit your profile picture</DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-2">
                      <div className="space-y-2">
                        {image ? (
                          <div className="group relative aspect-square overflow-hidden rounded-full border border-white/10">
                            <div className="absolute right-[calc(50%-1rem)] top-[calc(50%-1rem)] z-[10] opacity-0 transition-opacity group-hover:opacity-100">
                              <Hint
                                label="Remove profile image"
                                side="left"
                                asChild
                              >
                                <Button
                                  disabled={isPending}
                                  type="button"
                                  variant="destructive"
                                  onClick={onRemove}
                                  className="h-auto w-auto p-1.5"
                                >
                                  <Trash className="h-6 w-6" />
                                </Button>
                              </Hint>
                            </div>
                            <Image
                              src={image}
                              alt="Profile image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="rounded-full">
                            <UploadDropzone
                              endpoint="profileImageUploader"
                              appearance={{
                                label: {
                                  color: "#FFFFFF",
                                },
                                allowedContent: {
                                  color: "#FFFFFF",
                                },
                              }}
                              onClientUploadComplete={(res) => {
                                setImage(res?.[0].url);
                                console.log(res);
                                router.refresh();
                                closeRef?.current?.click?.();
                              }}
                              className="h-64"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                          <Button type="button" variant="ghost" autoFocus>
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          disabled={isPending}
                          type="submit"
                          variant="outline"
                        >
                          {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col items-end">
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
