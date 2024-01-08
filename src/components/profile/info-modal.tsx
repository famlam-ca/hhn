"use client";

import { ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Loader2, Pencil, Trash } from "lucide-react";

import { updateUser } from "@/server/user";
import { toast } from "@/components/ui/use-toast";
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
// import { UploadDropzone } from "@/lib/upload-thing";

interface InfoModalProps {
  initialUsername: string;
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
  initialImage: string;
}

export const InfoModal = ({
  initialUsername,
  initialFirstName,
  initialLastName,
  initialEmail,
  initialImage,
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [username, setUsername] = useState<string>(initialUsername);
  const [firstName, setFirstName] = useState<string>(initialFirstName);
  const [lastName, setLastName] = useState<string>(initialLastName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>("");

  const [image, setImage] = useState<string>(initialImage);
  const [isPending, startTransition] = useTransition();

  const onRemove = async () => {
    startTransition(() => {
      updateUser({ image: "https://www.famlam.ca/logo/logo512-blue-s.png" })
        .then(() => {
          toast({ title: "Profile image removed" });
          setImage("");
          closeRef?.current?.click();
        })
        .catch(() =>
          toast({
            title: "Something went wrong",
            variant: "destructive",
          }),
        );
    });
  };

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your profile info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-6">
            {/* TODO: Fix error on change || revalidate properly */}
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                disabled
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                disabled={isPending}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex items-center justify-between gap-x-6">
              <div className="w-full space-y-2">
                <Label>First name</Label>
                <Input
                  disabled={isPending}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="w-full space-y-2">
                <Label>Last name</Label>
                <Input
                  disabled={isPending}
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>

            {/* TODO: Integrate functionality */}
            <div className="flex items-center justify-between gap-x-6">
              <div className="w-full space-y-2">
                <Label>Password</Label>
                <Input
                  disabled
                  placeholder="Password"
                  onChange={(e) => setLastName(e.target.value)}
                  value={""}
                />
              </div>
              <div className="w-full space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  disabled
                  placeholder="Confirm Password"
                  onChange={(e) => e.target.value}
                  value={""}
                />
              </div>
            </div>
          </div>

          {/* TODO: Fix upload to database */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            {image ? (
              <div className="relative aspect-square h-52 w-52 overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-[10]">
                  <Hint label="Remove profile image" asChild side="left">
                    <Button
                      disabled={isPending}
                      type="button"
                      variant="destructive"
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
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
              <div className="rounded-xl border outline-dashed outline-muted">
                {/* TODO: Change to quill uploader */}
                {/* <UploadDropzone
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
                    router.refresh();
                    closeRef?.current?.click?.();
                  }}
                /> */}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost" autoFocus>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="outline">
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
  );
};
