import { DashboardSkeleton } from "./_components/dashboard";

// TODO: Fix loading state when waiting for axios response
const DashboardLoading = () => {
  return <DashboardSkeleton />;
};

export default DashboardLoading;
