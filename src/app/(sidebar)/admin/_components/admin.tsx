import { Users, columns } from "./columns";
import { UserTable } from "./user-table";

interface AdminProps {
  data: Users[];
}

export const Admin = ({ data }: AdminProps) => {
  return <UserTable columns={columns} data={data} />;
};
