import { useConsumerCartStore } from "@/common/stores/ConsumerCartStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import CartProductCard from "@/components/content/CartProductCard";
import { Popover } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./index.module.scss";

// FIX THIS MESS - Code is being repeated here.
// Cart and Popover must become a separated component.
// Unsigned and Signed menu must become one as well.
// You also need to fix some component names, more specifically the ListItem ones.
// Doublecheck everything whenever you pick this project up again.

export const UnsignedMenuItems = () => {
  const { user } = useUserSessionStore();

  const MySwal = withReactContent(Swal);

  // Cart configuration

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

  const {
    items: cartItems,
    clearItems,
    totalPrice,
    updTotalPrice,
  } = useConsumerCartStore();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleCartClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const handleClearCart = () => {
    const isConfirmed = window.confirm(
      "Isso vai apagar seu carrinho, tem certeza?",
    );
    if (isConfirmed) {
      clearItems();
    }
  };

  const handleMakeOrder = () => {
    if (!user) {
      MySwal.fire({
        title: <p>Falta pouco!</p>,
        text: "Você precisa estar autenticado para comprar",
        icon: "info",
      });
      return;
    }

    MySwal.fire({
      title: <p>Estamos trabalhando nisso!</p>,
      icon: "warning",
      html: (
        <div>
          <p>{`Esta funcionalidade ainda não está pronta, mas logo mais você conseguirá efetivar sua compra.`}</p>
          <img src="/images/no-no-sonic.gif" width={160} height={160} />
        </div>
      ),
    });
  };

  useEffect(() => {
    updTotalPrice();
  }, [cartItems, updTotalPrice]);

  return (
    <>
      <li>
        <RippleButton
          className={`ripple-btn rounded`}
          onClick={handleCartClick}
        >
          <BsCart3 className={style["btn-icon"]} />
        </RippleButton>
      </li>
      <li>
        <a className={`link`} href="/login">
          LOGIN
        </a>
      </li>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCartClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          paper: style["cart-container"],
        }}
      >
        <ul className={style["product-list"]}>
          {cartItems?.length
            ? cartItems.map((item) => (
                <CartProductCard
                  key={`item-${item.product.id}`}
                  cartItem={item}
                />
              ))
            : null}
        </ul>
        <div className={style["info-area"]}>
          <p className={style["txt-total-price"]}>
            <span>Total</span> {BRCurrency.format(totalPrice)}
          </p>
        </div>
        <menu className={style["actions-area"]}>
          <li>
            <RippleButton
              className={`ripple-btn ${style["cta-btn"]}`}
              onClick={() => handleMakeOrder()}
            >
              COMPRAR
            </RippleButton>
          </li>
          <li>
            <RippleButton
              className={`ripple-btn ${style["cta-btn"]}`}
              onClick={() => handleClearCart()}
            >
              LIMPAR
            </RippleButton>
          </li>
        </menu>
      </Popover>
    </>
  );
};

export const SignedMenuItems = () => {
  const { signOut, user } = useUserSessionStore();

  const MySwal = withReactContent(Swal);

  const onSignOut = () =>
    MySwal.fire({
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      title: "Usuário desconectado!",
      position: "bottom-right",
    });

  // Cart configuration

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

  const {
    items: cartItems,
    clearItems,
    totalPrice,
    updTotalPrice,
  } = useConsumerCartStore();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleCartClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const handleClearCart = () => {
    const isConfirmed = window.confirm(
      "Isso vai apagar seu carrinho, tem certeza?",
    );
    if (isConfirmed) {
      clearItems();
    }
  };

  const handleMakeOrder = () => {
    if (!user) {
      MySwal.fire({
        title: <p>Falta pouco!</p>,
        text: "Você precisa estar autenticado para comprar",
        icon: "info",
      });
      return;
    }

    MySwal.fire({
      title: <p>Estamos trabalhando nisso!</p>,
      icon: "warning",
      html: (
        <div>
          <p>{`Esta funcionalidade ainda não está pronta, mas logo mais você conseguirá efetivar sua compra.`}</p>
          <img src="/images/no-no-sonic.gif" width={160} height={160} />
        </div>
      ),
    });
  };

  useEffect(() => {
    updTotalPrice();
  }, [cartItems, updTotalPrice]);

  return (
    <>
      {user?.consumerId ? (
        <li>
          <RippleButton
            className={`ripple-btn rounded`}
            onClick={handleCartClick}
          >
            <BsCart3 className={style["btn-icon"]} />
          </RippleButton>
        </li>
      ) : null}
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCartClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          paper: style["cart-container"],
        }}
      >
        <ul className={style["product-list"]}>
          {cartItems?.length
            ? cartItems.map((item) => (
                <CartProductCard
                  key={`item-${item.product.id}`}
                  cartItem={item}
                />
              ))
            : null}
        </ul>
        <div className={style["info-area"]}>
          <p className={style["txt-total-price"]}>
            <span>Total</span> {BRCurrency.format(totalPrice)}
          </p>
        </div>
        <menu className={style["actions-area"]}>
          <li>
            <RippleButton
              className={`ripple-btn ${style["cta-btn"]}`}
              onClick={() => handleMakeOrder()}
            >
              COMPRAR
            </RippleButton>
          </li>
          <li>
            <RippleButton
              className={`ripple-btn ${style["cta-btn"]}`}
              onClick={() => handleClearCart()}
            >
              LIMPAR
            </RippleButton>
          </li>
        </menu>
      </Popover>
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
