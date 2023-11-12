import { HydrationZustand } from "@/components/common/HydrationZustand";
import Footer from "../Footer";
import NavbarPrimary from "../Navbars/NavbarPrimary";
import style from "./index.module.scss";

export type LayoutPrimaryProps = {
  children?: React.ReactNode;
};

function LayoutPrimary({ children }: LayoutPrimaryProps) {
  return (
    <>
      <HydrationZustand>
        <NavbarPrimary />
      </HydrationZustand>
      <div className={style["content"]}>{children}</div>
      <Footer />
    </>
  );
}

export default LayoutPrimary;
