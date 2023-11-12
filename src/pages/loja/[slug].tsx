import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import { useProductImageData } from "@/common/hooks/useProductData";
import { IBusinessResponse } from "@/common/responses/IBusinessResponse";
import { IPaginatedResponse } from "@/common/responses/IPaginatedResponse";
import { IProductResponse } from "@/common/responses/IProductResponse";
import { IProfileImageResponse } from "@/common/responses/IProfileImageResponse";
import { IProfileResponse } from "@/common/responses/IProfileResponse";
import { AppAxios } from "@/common/utilities/AppAxios";
import RippleButton from "@/components/common/RippleButton";
import { ProductListItemProps } from "@/components/content/Dashboard/ProductArea/ProductListItem";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { Pagination } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { ReactElement, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { GrTrash } from "react-icons/gr";
import { HiMagnifyingGlass } from "react-icons/hi2";
import style from "./index.module.scss";

type BusinessPageProps = {
  products: IPaginatedResponse<IProductResponse>;
  business: IBusinessResponse;
  businessImage: IProfileImageResponse;
};

export const getServerSideProps = (async (context) => {
  const businessQuery = stringify({
    slug: context.params?.slug,
    include: {
      business: {
        include: {
          businessType: true,
          businessOwner: true,
        },
      },
    },
  });

  const business = await AppAxios.client
    .get<IPaginatedResponse<IProfileResponse>>(`v1/profile?${businessQuery}`)
    .then((result) => result.data?.data?.[0].business);

  if (!business) {
    return { notFound: true };
  }

  const businessImageQuery = stringify({
    image: {
      imageType: {
        type: EImageType.PROFILE_AVATAR_1,
      },
    },
  });

  const businessImage = await AppAxios.client
    .get<IPaginatedResponse<IProfileImageResponse>>(
      `v1/profile/${business.profileId}/image?${businessImageQuery}`,
    )
    .then((result) => result.data?.data?.[0]);

  const productQuery = stringify({});

  const products = await AppAxios.client
    .get<IPaginatedResponse<IProductResponse>>(
      `v1/business/${business.id}/product?${productQuery}`,
    )
    .then((result) => result.data);

  return {
    props: {
      products,
      business,
      businessImage,
    },
  };
}) satisfies GetServerSideProps<BusinessPageProps>;

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

const ProductPage = ({
  products,
  business,
  businessImage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();

  const [productPage, setProductPage] = useState(1);

  const { razaoSocial, nomeFantasia, cnpj, profile } = business || {};

  const { image } = businessImage || {};

  const { data: productList, pages } = products || {};

  return (
    <>
      <Head>
        <title>PackShop - Loja</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.container}>
        <div className={style.content}>
          <h1>Store's Page</h1>

          <div className={style["image-box"]}>
            <img
              src={image?.imageUrl || Defaults.Placeholders.avatar}
              width={128}
              height={128}
              alt={
                nomeFantasia
                  ? `Logomarca da ${nomeFantasia}`
                  : "Logomarca da loja"
              }
              title={
                nomeFantasia
                  ? `Logomarca da ${nomeFantasia}`
                  : "Logomarca da loja"
              }
            />
          </div>
          <p className={`txt-bold`}>{razaoSocial}</p>
          <p>{nomeFantasia}</p>
          <p>
            <span className={`txt-bold`}>CNPJ: </span>
            {cnpj}
          </p>
          <h2>Produtos</h2>
          <div className={style["product-list-area"]}>
            <ul className={style["product-list"]}>
              {productList
                ? productList.map((product) => (
                    <ProductListItem
                      key={`product-${product.id}`}
                      product={product}
                    />
                  ))
                : null}
            </ul>
            <div className={style["pagination"]}>
              <Pagination
                variant="outlined"
                shape="rounded"
                count={pages}
                page={productPage}
                onChange={(ev, value) => setProductPage(value)}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutPrimary>{page}</LayoutPrimary>;
};

export default ProductPage;
