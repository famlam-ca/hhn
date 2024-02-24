import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { authOptions } from "@/lib/auth-options";
import { getServerById } from "@/lib/server-service";
import { ServerData, ServerType } from "@/types/types";

import { Console } from "./_components/console";
import { Header } from "./_components/header";

interface ServerPageProps {
  params: {
    slug: [type: ServerType, serverId: number];
  };
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role!;

  const type = params.slug[0];
  const id = params.slug[1];

  if (role !== "admin") {
    redirect("/unauthorized");
  }

  const server: ServerData = await getServerById(type, id);

  return (
    <MaxWidthWrapper className="max-w-full space-y-4">
      <Header server={server} type={type} />

      <Console server={server} />
    </MaxWidthWrapper>
  );
};

export default ServerPage;
