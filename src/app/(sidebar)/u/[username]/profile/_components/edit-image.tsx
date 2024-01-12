"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/server/user";
import { UploadDropzone } from "@/lib/upload-thing";

interface EditImageProps {
  initialImage: string;
}

export const EditImage = ({ initialImage }: EditImageProps) => {
  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);

  const [image, setImage] = useState<string>(initialImage);
  const [isPending, startTransition] = useTransition();

  const onRemove = async () => {
    startTransition(() => {
      updateUser({ image: "https://www.famlam.ca/logo/logo512-blue-s.png" })
        .then(() => {
          toast({ title: "Profile image removed" });
          setImage("");
          router.refresh();
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
        <div className="group relative aspect-square h-52 w-52 overflow-hidden rounded-full border border-accent">
          <div className="absolute right-[calc(50%-1rem)] top-[calc(50%-1rem)] z-[10] opacity-0 transition-opacity group-hover:opacity-100">
            <Hint label="Edit profile image" side="left" asChild>
              <Button
                disabled={isPending}
                type="button"
                variant="secondary"
                className="h-auto w-auto p-1.5"
              >
                <Pencil className="h-5 w-5" />
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit your profile picture</DialogHeader>
        <div className="space-y-2">
          {image ? (
            <div className="group relative aspect-square overflow-hidden rounded-full border border-white/10">
              <div className="absolute right-[calc(50%-1rem)] top-[calc(50%-1rem)] z-[10] opacity-0 transition-opacity group-hover:opacity-100">
                <Hint label="Remove profile image" side="left" asChild>
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
            onClick={() => {
              setImage("https://www.famlam.ca/logo/logo512-blue-s.png");
              closeRef?.current?.click?.();
            }}
            variant="outline"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
