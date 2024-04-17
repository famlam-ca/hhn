import { UserTable } from "./user-table";
import { Users, userColumns } from "./user-table/columns";

interface AdminProps {
  data: Users[];
}

export const Admin = ({ data }: AdminProps) => {
  return <UserTable columns={userColumns} data={data} />;
};
