import { Navbar } from "./_components/nav";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
