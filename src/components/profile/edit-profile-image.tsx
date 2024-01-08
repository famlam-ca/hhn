"use client";

import { ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Loader2, Pencil, Trash } from "lucide-react";

import { updateUser } from "@/server/user";
import { toast } from "@/components/ui/use-toast";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/upload-thing";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";

interface EditProfileImageProps {
  username: string;
  initialImage: string;
}

export const EditProfileImage = ({
  username,
  initialImage,
}: EditProfileImageProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [isPending, startTransition] = useTransition();

  const onRemove = async () => {
    startTransition(() => {
      updateUser({ image: "https://www.famlam.ca/logo/logo512-blue-s.png" })
        .then(() => {
          toast({
            title: "Profile image updated",
          });
          setImageUrl("https://www.famlam.ca/logo/logo512-blue-s.png");
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
      updateUser({ image: imageUrl })
        .then(() => {
          toast({ title: "Profile image updated" });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-auto">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your profile image</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Profile image</Label>
            {imageUrl ? (
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
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
                  src={imageUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
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
                  setImageUrl(res?.[0]?.url);
                  router.refresh();
                  closeRef?.current?.click?.();
                }}
                className="h-64"
              />
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
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
