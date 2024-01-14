import { UserCog } from "lucide-react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { Users, columns } from "./columns";
import { UserTable } from "./user-table";

interface AdminProps {
  data: Users[];
}

export const Admin = ({ data }: AdminProps) => {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center">
        <UserCog className="mr-2 h-8 w-8" />
        AdminPage
      </div>
      <div className="mt-8">
        <UserTable columns={columns} data={data} />
      </div>
    </MaxWidthWrapper>
  );
};
