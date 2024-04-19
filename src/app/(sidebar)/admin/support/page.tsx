import { db } from "@/lib/db";
import { SupportTicket } from "@/types";

import { SupportTicketsTable } from "./_components/support-tickets-table";
import { supportTicketColumns } from "./_components/support-tickets-table/columns";

const AdminSupport = async () => {
  const data = (await db.supportTicket.findMany()) as SupportTicket[];

  return <SupportTicketsTable columns={supportTicketColumns} data={data} />;
};

export default AdminSupport;
