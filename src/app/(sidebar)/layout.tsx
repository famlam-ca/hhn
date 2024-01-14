import { Sidebar } from "./_components/sidebar/index";
import { Container } from "./_components/container";

const SidebarLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
};

export default SidebarLayout;
