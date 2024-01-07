import { Navigation } from "./navigation";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Navbar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
