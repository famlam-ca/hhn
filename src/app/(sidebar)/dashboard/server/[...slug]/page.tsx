import { redirect } from "next/navigation";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { validateSession } from "@/lib/lucia";
import { getServerById } from "@/lib/services/server-service";
import { ServerData, ServerType } from "@/types";

import { Console } from "./_components/console";
import { Header } from "./_components/header";

interface ServerPageProps {
  params: {
    slug: [type: ServerType, serverId: number];
  };
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const { user } = await validateSession();
  const role = user?.role!;

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
