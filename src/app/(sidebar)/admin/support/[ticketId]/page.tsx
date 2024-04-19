import { getSupportTicket } from "@/lib/services/support-service";
import { SupportTicket } from "@/types";
import { TicketInfo } from "./_components/ticket-info";

const SupportTicketPage = async ({
  params,
}: {
  params: { ticketId: string };
}) => {
  const { ticket } = await getSupportTicket({ ticketId: params.ticketId });
  if (!ticket) {
    return <div>Support ticket not found</div>;
  }

  return (
    <div className="space-y-4">
      <TicketInfo ticket={ticket as SupportTicket} />
    </div>
  );
};

export default SupportTicketPage;
