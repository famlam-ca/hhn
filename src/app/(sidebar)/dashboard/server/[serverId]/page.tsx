import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { authOptions } from "@/lib/auth-options";
import { getServerById } from "@/lib/server-service";
import { ServerData, serverType } from "@/types/types";

import { Console } from "./_components/console";
import { Header } from "./_components/header";

interface ServerPageProps {
  params: {
    serverId: number;
  };
  searchParams: {
    type: serverType;
  };
}

const ServerPage = async ({ params, searchParams }: ServerPageProps) => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role!;

  if (role !== "admin") {
    redirect("/unauthorized");
  }

  const server: ServerData = await getServerById(
    params.serverId,
    searchParams.type,
  );

  return (
    <MaxWidthWrapper className="max-w-full space-y-4">
      <Header server={server} />

      <Console server={server} />
    </MaxWidthWrapper>
  );
};

export default ServerPage;
