import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import Image from "next/image";
import style from "./index.module.scss";

const PrimaryNavbar = () => {
  const { signOut, status } = useUserSessionStore();

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
        {status === "signed" ? (
          <>
            <li>
              <p>
                <b>Authenticated</b>
              </p>
            </li>
            <li>
              <button onClick={() => signOut()}>SIGN-OUT</button>
            </li>
          </>
        ) : (
          <li>
            <a className={`link`} href="/login">
              LOGIN
            </a>
          </li>
        )}
      </menu>
    </nav>
  );
};

export default PrimaryNavbar;
