import { Suspense } from "react";

import { Dashboard } from "./_components/dashboard";
import DashboardLoading from "./loading";

const Page = async () => {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard />
    </Suspense>
  );
};

export default Page;
