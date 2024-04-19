"use client";

import { LucideIcon } from "lucide-react";
import { ElementRef, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTicket } from "@/lib/services/support-service";
import { TicketStatus } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface TicketActionsProps {
  label: TicketStatus;
  icon: LucideIcon;
  color: string;
  ticketId: string;
}

export const TicketActions = ({
  icon: Icon,
  label,
  color,
  ticketId,
}: TicketActionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const res = await updateTicket({ ticketId, status: label });
      if (!res.success) {
        toast({
          title: res.message,
          variant: "destructive",
        });
      }

      // TODO: Submit reason for status change

      closeRef?.current?.click?.();
    });
  };

  const labelMap: { [key in TicketStatus]: string } = {
    resolved: "Resolve",
    pending: "Pend",
    closed: "Close",
    open: "Open",
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={`text-${color}`}>
            <Icon className="mr-2 h-4 w-4" />
            {labelMap[label] || "open"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Change ticket status to
              <span className="lowercase"> {label}</span>?
            </DialogDescription>
          </DialogHeader>
          <Textarea disabled={isPending} className="resize-none" />
          <div className="flex justify-between">
            <Button
              disabled={isPending}
              variant="outline"
              onClick={onClick}
              className={`text-${color}`}
            >
              {labelMap[label] || "open"} ticket
            </Button>
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost" autoFocus>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
