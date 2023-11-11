import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import { BiMenu } from "react-icons/bi";
import style from "./index.module.scss";

const NavbarMenuItems = () => {
  const { signOut } = useUserSessionStore();

  return (
    <>
      <li>
        <p>
          <a href="/dashboard">
            <b>Dashboard</b>
          </a>
        </p>
      </li>
      <li>
        <button onClick={() => signOut()}>SIGN-OUT</button>
      </li>
    </>
  );
};

const NavbarDashboard = () => {
  const { user } = useUserSessionStore();
  return (
    <nav className={`${style.navbar} dft-padding`}>
      <div className={style["left-area"]}>
        <RippleButton onClick={() => null} classes={{ root: style.btn }}>
          <BiMenu className={style.icon} />
        </RippleButton>
      </div>
      <menu className={style["right-area"]}>
        <NavbarMenuItems />
      </menu>
    </nav>
  );
};

export default NavbarDashboard;
