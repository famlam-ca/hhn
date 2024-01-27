import { Suspense } from "react";

import { Dashboard, DashboardSkeleton } from "./_components/dashboard";

const Page = async () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
};

export default Page;
