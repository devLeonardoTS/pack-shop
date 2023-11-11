import { useBusinessDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { HydrationZustand } from "@/components/common/HydrationZustand";
import DashboardProducts from "@/components/content/DashboardProducts";
import { Drawer } from "@mui/material";
import Footer from "../Footer";
import NavbarDashboard from "../Navbars/NavbarDashboard";
import style from "./index.module.scss";

export type LayoutDashboardProps = {
  children?: React.ReactNode;
};

function LayoutDashboard({ children }: LayoutDashboardProps) {
  const { setDashboardContent } = useBusinessDashboardStore();

  return (
    <div className={style.container}>
      <Drawer
        variant="permanent"
        classes={{ root: style["drawer"], paper: style["drawer"] }}
      >
        <div>
          <p>Avatar</p>
          <p>Razão Social ou Nome usuário</p>
          <p>btn:Editar Perfil</p>
        </div>

        <hr />
        <menu>
          <li>
            <button onClick={() => setDashboardContent()}>Overview</button>
            <button onClick={() => setDashboardContent(<DashboardProducts />)}>
              Produtos
            </button>
          </li>
        </menu>
        <hr />
        <p>btn: Sair</p>
      </Drawer>
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
