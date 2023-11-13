import { Defaults } from "@/common/constants/Defaults";
import { useProductImageData } from "@/common/hooks/useProductData";
import {
  CartItem,
  useConsumerCartStore,
} from "@/common/stores/ConsumerCartStore";
import RippleButton from "@/components/common/RippleButton";
import { BsX } from "react-icons/bs";
import style from "./index.module.scss";

export type CartProductCardProps = {
  cartItem: CartItem;
};

function CartProductCard({ cartItem }: CartProductCardProps) {
  const { rmvProduct, updProduct } = useConsumerCartStore();

  const { product, quantity } = cartItem;

  // const { data: productData } = useProductData({
  //   resourceId: product.id
  // });
  const { slug, name, price, stock } = product || {};

  const { data: productImgQuery } = useProductImageData(product.id);
  const { image } = productImgQuery || {};

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const NumberFormater = new Intl.NumberFormat("pt-BR");

  return (
    <li className={style["container"]}>
      <div className={style["image-area"]}>
        <RippleButton>
          <a href={`/produto/${slug}`} className={style["image-area"]}>
            <div className={style["image-box"]}>
              <img
                src={image?.imageUrl || Defaults.Placeholders.avatar}
                width={64}
                height={64}
                alt={name ? `Imagem para ${name}` : `Imagem do produto`}
                title={name ? `Imagem para ${name}` : `Imagem do produto`}
              />
            </div>
          </a>
        </RippleButton>
      </div>

      <div className={style["right-area"]}>
        <div className={style["details-area"]}>
          <div className={style["text-area"]}>
            <div className={style["header"]}>
              <a
                className={`link line-clamped ${style["txt-title"]}`}
                href={`/produto/${slug}`}
              >
                {name}
              </a>
            </div>
            <p className={style["txt-price"]}>
              <span>{BRCurrency.format(Number(price))}</span>
            </p>
            <p className={style["txt-total-price"]}>
              <span>Total: </span>
              {BRCurrency.format(Number(price) * quantity)}
            </p>
          </div>
          <div className={style["end-area"]}>
            <RippleButton
              className={`ripple-btn rounded ${style["btn"]}`}
              onClick={() => rmvProduct(product.id)}
            >
              <BsX className={style["btn-icon"]} />
            </RippleButton>
          </div>
        </div>
        <div className={style["action-area"]}>
          <div className={style["increment-options"]}>
            <RippleButton
              className={`${style["btn"]}`}
              onClick={() => updProduct(product.id, quantity - 1)}
            >
              -
            </RippleButton>
            {quantity}
            <RippleButton
              className={`${style["btn"]}`}
              onClick={() => updProduct(product.id, quantity + 1)}
            >
              +
            </RippleButton>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartProductCard;
