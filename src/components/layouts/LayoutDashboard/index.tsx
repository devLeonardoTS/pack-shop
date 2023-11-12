import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { HydrationZustand } from "@/components/common/HydrationZustand";
import ConsumerDrawer from "@/components/content/Dashboard/ConsumerDrawer";
import SellerDrawer from "@/components/content/Dashboard/SellerDrawer";
import Footer from "../Footer";
import NavbarDashboard from "../Navbars/NavbarDashboard";
import style from "./index.module.scss";

export type LayoutDashboardProps = {
  children?: React.ReactNode;
};

function LayoutDashboard({ children }: LayoutDashboardProps) {
  const { user } = useUserSessionStore();
  const { profileId, businessId, consumerId } = user || {};

  return (
    <div className={style.container}>
      {businessId ? <SellerDrawer /> : null}
      {consumerId ? <ConsumerDrawer /> : null}
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
