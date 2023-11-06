import Image from "next/image";
import style from "./index.module.scss";

const PrimaryNavbar = () => {
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
        <li>
          <a className={`link`} href="/login">
            LOGIN
          </a>
        </li>
      </menu>
    </nav>
  );
};

export default PrimaryNavbar;
