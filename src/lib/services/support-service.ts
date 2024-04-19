"use server";

import { db } from "@/lib/db";
import { TicketStatus } from "@/types";
import { revalidatePath } from "next/cache";

export const getSupportTicket = async ({ ticketId }: { ticketId: string }) => {
  const ticket = await db.supportTicket.findFirst({
    where: { id: ticketId },
  });
  if (!ticket) {
    return {
      success: false,
      message: "Ticket not found",
    };
  }

  return {
    success: true,
    ticket,
  };
};

export const updateTicket = async ({
  ticketId,
  status,
}: {
  ticketId: string;
  status: TicketStatus;
}) => {
  const ticket = await db.supportTicket.findFirst({
    where: { id: ticketId },
  });
  if (!ticket) {
    return {
      success: false,
      message: "Ticket not found",
    };
  }

  await db.supportTicket.update({
    where: { id: ticketId },
    data: {
      status: status,
    },
  });

  revalidatePath(`/admin/support`);
  revalidatePath(`/admin/support/${ticketId}`);

  return {
    success: true,
    message: "Ticket updated.",
  };
};
