"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CertShowcaseProps {
  src: string;
  alt: string;
}

export const CertShowcase = ({ src, alt }: CertShowcaseProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={src} alt={alt} className="h-44 w-44 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-[50%]">
        <img src={src} alt={alt} />

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
