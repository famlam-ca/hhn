"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CertShowcaseProps {
  label: string
  image: string
}

export const CertShowcase = ({ label, image }: CertShowcaseProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={image} alt={label} className="h-44 w-44 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-[50%]">
        <img src={image} alt={label} />

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
