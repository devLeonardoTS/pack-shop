import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

  const MySwal = withReactContent(Swal);

  const onSignOut = () =>
    MySwal.fire({
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      title: "Usuário desconectado!",
      position: "bottom-right",
    });

  return (
    <>
      <li>
        <RippleButton className={`ripple-btn rounded`} onClick={() => {}}>
          <BsCart3 className={style["btn-icon"]} />
        </RippleButton>
      </li>
      <li>
        <p>
          <a href="/dashboard" className={`link`}>
            <b>Dashboard</b>
          </a>
        </p>
      </li>
      <li>
        <button onClick={() => signOut({ onSuccess: () => onSignOut() })}>
          SIGN-OUT
        </button>
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
