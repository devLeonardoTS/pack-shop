import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import Image from "next/image";
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
        <a href="/">
          <Image
            className={style["logomark"]}
            priority
            src="/images/logomark.svg"
            height={64}
            width={64}
            alt="Logomarca PackShop Marketplace"
          />
        </a>
      </div>
      <menu className={style["right-area"]}>
        <NavbarMenuItems />
      </menu>
    </nav>
  );
};

export default NavbarDashboard;
