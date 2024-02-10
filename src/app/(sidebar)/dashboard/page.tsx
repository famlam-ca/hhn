import { Suspense } from "react";

import { serverType } from "@/types/types";

import { Dashboard } from "./_components/dashboard";
import DashboardLoading from "./loading";

type PageProps = {
  searchParams: {
    type: serverType;
  };
};

const Page = (searchParams: PageProps) => {
  const type = searchParams.searchParams;

  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard searchParams={type} />
    </Suspense>
  );
};

export default Page;
