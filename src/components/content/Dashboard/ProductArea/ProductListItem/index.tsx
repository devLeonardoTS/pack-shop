import { Defaults } from "@/common/constants/Defaults";
import { useProductImageData } from "@/common/hooks/useProductData";
import { IProductResponse } from "@/common/responses/IProductResponse";
import RippleButton from "@/components/common/RippleButton";
import { useRouter } from "next/router";
import { BsPencilSquare } from "react-icons/bs";
import { GrTrash } from "react-icons/gr";
import { HiMagnifyingGlass } from "react-icons/hi2";
import style from "./index.module.scss";

export type ProductListItemProps = {
  product: IProductResponse;
};

function ProductListItem({ product }: ProductListItemProps) {
  const router = useRouter();

  const { data: productImgQuery } = useProductImageData(product.id);
  const { image } = productImgQuery || {};

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const CompactNumber = new Intl.NumberFormat("pt-BR");

  return (
    <li className={style["container"]}>
      <div className={style["image-box"]}>
        <img
          src={image?.imageUrl || Defaults.Placeholders.avatar}
          width={128}
          height={128}
          alt={
            product.name ? `Imagem para ${product.name}` : `Imagem do produto`
          }
          title={
            product.name ? `Imagem para ${product.name}` : `Imagem do produto`
          }
        />
      </div>
      <div className={style["text-area"]}>
        <div className={style["header"]}>
          <p>
            <span className={`txt-bold`}>SKU: </span>
            {product.sku}
          </p>
          <p>
            <span className={`txt-bold`}>Preço: </span>
            {BRCurrency.format(Number(product.price))}
          </p>
          <p>
            <span className={`txt-bold`}>Em estoque: </span>
            {CompactNumber.format(product.stock)}
          </p>
        </div>
        <div className={style["content"]}>
          <p className={style["title"]}>{product.name}</p>
          <p className={style["description"]}>{product.description}</p>
        </div>
      </div>
      <div className={style["action-area"]}>
        <a href={`/produto/${product.slug}`}>
          <RippleButton className={`ripple-btn rounded`}>
            <HiMagnifyingGlass className={style["btn-icon"]} />
          </RippleButton>
        </a>
        <RippleButton className={`ripple-btn rounded`} onClick={() => {}}>
          <BsPencilSquare className={style["btn-icon"]} />
        </RippleButton>
        <RippleButton className={`ripple-btn rounded`} onClick={() => {}}>
          <GrTrash className={style["btn-icon"]} />
        </RippleButton>
      </div>
    </li>
  );
}

export default ProductListItem;
