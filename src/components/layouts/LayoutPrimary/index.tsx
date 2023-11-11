import { HydrationZustand } from "@/components/common/HydrationZustand";
import Footer from "../Footer";
import NavbarPrimary from "../Navbars/NavbarPrimary";

export type LayoutPrimaryProps = {
  children?: React.ReactNode;
};

function LayoutPrimary({ children }: LayoutPrimaryProps) {
  return (
    <>
      <HydrationZustand>
        <NavbarPrimary />
      </HydrationZustand>
      {children}
      <Footer />
    </>
  );
}

export default LayoutPrimary;
