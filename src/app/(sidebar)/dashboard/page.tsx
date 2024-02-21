import { Suspense } from "react";

import { ServerType } from "@/types/types";

import { Dashboard } from "./_components/dashboard";
import DashboardLoading from "./loading";

interface PageProps {
  searchParams: {
    type: ServerType;
  };
}

const Page = ({ searchParams }: PageProps) => {
  if (!searchParams.type) {
    searchParams.type = "lxc";
  }

  if (searchParams.type !== "lxc" && searchParams.type !== "qemu") {
    throw new Error("Invalid server type. Type must be 'lxc' or 'qemu'.");
  }

  // console.log("Page type:", searchParams.type); // debug

  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard type={searchParams.type} />
    </Suspense>
  );
};

export default Page;
