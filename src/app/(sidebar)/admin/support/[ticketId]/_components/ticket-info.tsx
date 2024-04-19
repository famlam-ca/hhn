"use client";

import { TicketCheck, TicketPercent, TicketPlus, TicketX } from "lucide-react";

import { RefreshButton } from "@/components/refresh-button";
import { SupportTicket, TicketStatus } from "@/types";

import { TicketActions } from "./ticket-actions";

export const TicketInfo = ({ ticket }: { ticket: SupportTicket }) => {
  const StatusActions = [
    {
      label: "resolved",
      icon: TicketCheck,
      color: "success",
    },
    {
      label: "pending",
      icon: TicketPercent,
      color: "warning",
    },
    {
      label: "open",
      icon: TicketPlus,
      color: "alert",
    },
    {
      label: "closed",
      icon: TicketX,
      color: "muted-foreground",
    },
  ];

  return (
    <>
      <div className="space-y-1">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">{ticket.subject}</h2>
            <small
              className={`text-xs capitalize ${
                ticket.status === "open"
                  ? "text-alert"
                  : ticket.status === "pending"
                    ? "text-warning"
                    : ticket.status === "closed"
                      ? "text-muted-foreground"
                      : "text-success"
              }`}
            >
              {ticket.status}
            </small>
          </div>

          <div className="flex items-center max-sm:justify-between sm:space-x-2">
            <div className="space-x-2">
              {StatusActions.map((action) => (
                <TicketActions
                  key={action.label}
                  label={action.label as TicketStatus}
                  icon={action.icon}
                  color={action.color}
                  ticketId={ticket.id}
                />
              ))}
            </div>

            <RefreshButton />
          </div>
        </div>
      </div>
    </>
  );
};
