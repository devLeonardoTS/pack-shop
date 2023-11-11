import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import Image from "next/image";
import style from "./index.module.scss";

const UnsignedMenuItems = () => {
  return (
    <li>
      <a className={`link`} href="/login">
        LOGIN
      </a>
    </li>
  );
};

const SignedMenuItems = () => {
  const { signOut } = useUserSessionStore();

  return (
    <>
      <li>
        <p>
          <a href="/dashboard" className={`link`}>
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

const NavbarPrimary = () => {
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
        {user ? <SignedMenuItems /> : <UnsignedMenuItems />}
      </menu>
    </nav>
  );
};

export default NavbarPrimary;
