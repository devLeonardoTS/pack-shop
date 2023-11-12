import { Defaults } from "@/common/constants/Defaults";
import { useProductImageData } from "@/common/hooks/useProductData";
import RippleButton from "@/components/common/RippleButton";
import { useRouter } from "next/router";
import { ProductListItemProps } from "../Dashboard/ProductArea/ProductListItem";
import style from "./index.module.scss";

function ProductListItem({ product }: ProductListItemProps) {
  const router = useRouter();

  const { data: productImgQuery } = useProductImageData(product.id);
  const { image } = productImgQuery || {};

  const { slug, name, price, stock } = product || {};

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const CompactNumber = new Intl.NumberFormat("pt-BR");

  return (
    <li className={style["container"]}>
      <RippleButton>
        <a href={`/produto/${product.slug}`} className={style["image-area"]}>
          <div className={style["image-box"]}>
            <img
              src={image?.imageUrl || Defaults.Placeholders.avatar}
              width={128}
              height={128}
              alt={
                product.name
                  ? `Imagem para ${product.name}`
                  : `Imagem do produto`
              }
              title={
                product.name
                  ? `Imagem para ${product.name}`
                  : `Imagem do produto`
              }
            />
          </div>
        </a>
      </RippleButton>
      <hr />
      <div className={style["text-area"]}>
        <a
          className={`link line-clamped ${style["txt-title"]}`}
          href={`/produto/${product.slug}`}
        >
          {product.name}
        </a>
        <p className={style["txt-price"]}>
          <span>{BRCurrency.format(Number(product.price))}</span>
        </p>
        <p className={style["txt-stock"]}>
          <span>Restam: </span>
          {CompactNumber.format(product.stock)}
        </p>
      </div>
      <div className={style["action-area"]}>
        <RippleButton className={`${style["cta-btn"]}`} onClick={() => {}}>
          ADICIONAR AO CARRINHO
        </RippleButton>
      </div>
    </li>
  );
}

export default ProductListItem;
