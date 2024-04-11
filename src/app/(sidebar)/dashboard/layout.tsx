import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
