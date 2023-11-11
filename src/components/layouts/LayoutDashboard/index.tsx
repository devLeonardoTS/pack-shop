import { HydrationZustand } from "@/components/common/HydrationZustand";
import SellerDrawer from "@/components/content/Dashboard/SellerDrawer";
import Footer from "../Footer";
import NavbarDashboard from "../Navbars/NavbarDashboard";
import style from "./index.module.scss";

export type LayoutDashboardProps = {
  children?: React.ReactNode;
};

function LayoutDashboard({ children }: LayoutDashboardProps) {
  return (
    <div className={style.container}>
      <SellerDrawer />
      <div className={style.content}>
        <HydrationZustand>
          <NavbarDashboard />
        </HydrationZustand>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default LayoutDashboard;
