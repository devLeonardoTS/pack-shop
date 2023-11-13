import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import { IBusinessResponse } from "@/common/responses/IBusinessResponse";
import { IPaginatedResponse } from "@/common/responses/IPaginatedResponse";
import { IProductImageResponse } from "@/common/responses/IProductImageResponse";
import { IProductResponse } from "@/common/responses/IProductResponse";
import { useConsumerCartStore } from "@/common/stores/ConsumerCartStore";
import { AppAxios } from "@/common/utilities/AppAxios";
import RippleButton from "@/components/common/RippleButton";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { stringify } from "qs";
import { ReactElement } from "react";
import style from "./index.module.scss";

type ProductPageProps = {
  product: IProductResponse;
  productImages: IPaginatedResponse<IProductImageResponse>;
  business: IBusinessResponse;
};

export const getServerSideProps = (async (context) => {
  const productQuery = stringify({
    slug: context.params?.slug,
  });

  const product = await AppAxios.client
    .get<IPaginatedResponse<IProductResponse>>(`v1/product?${productQuery}`)
    .then((result) => result.data?.data?.[0]);

  if (!product) {
    return { notFound: true };
  }

  const productImageQuery = stringify({
    limit: 100,
  });

  const productImages = await AppAxios.client
    .get<IPaginatedResponse<IProductImageResponse>>(
      `v1/product/${product.id}/image?${productImageQuery}`,
    )
    .then((result) => result.data);

  const businessQuery = stringify({
    include: {
      businessType: true,
      businessOwner: true,
      profile: true,
    },
  });

  const business = await AppAxios.client
    .get<IBusinessResponse>(
      `v1/business/${product.businessId}?${businessQuery}`,
    )
    .then((result) => result.data);

  return {
    props: {
      product: product || null,
      productImages: productImages || null,
      business: business || null,
    },
  };
}) satisfies GetServerSideProps<ProductPageProps>;

const ProductPage = ({
  product,
  productImages,
  business,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { addProduct } = useConsumerCartStore();

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

  const CompactNumber = new Intl.NumberFormat("pt-BR");

  const {
    sku,
    brand,
    name,
    description,
    price,
    stock,
    expiresAt,
    weightKg,
    widthCm,
    heightCm,
    lengthCm,
    isAvailable,
    manufacturedAt,
    createdAt,
    updatedAt,
  } = product || {};

  const { data: prodImagesArray } = productImages || {};

  const displayPicture = prodImagesArray.find(
    (value) => value.image.imageType.type === EImageType.PRODUCT_DISPLAY_1,
  );

  const { razaoSocial, nomeFantasia, cnpj, profile } = business || {};

  const { slug } = profile || {};

  return (
    <>
      <Head>
        <title>PackShop - Produto</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.container}>
        <div className={style.content}>
          {/* <h1>Product's Page</h1> */}
          <div className={style["image-box"]}>
            <img
              src={
                displayPicture?.image.imageUrl || Defaults.Placeholders.avatar
              }
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
          <div className={style["product-txt-area"]}>
            <div className={style["header-area"]}>
              <h1 className={`${style["title"]}`}>{name}</h1>
              <div className={style["details-area"]}>
                <p className={style["txt-sku"]}>
                  <span className={`txt-bold`}>SKU: </span>
                  {sku}
                </p>
                <p className={style["txt-brand"]}>
                  <span className={`txt-bold`}>Marca: </span>
                  {brand}
                </p>

                <p className={style["txt-stock"]}>
                  <span className={`txt-bold`}>Estoque: </span>
                  {stock}
                </p>
              </div>
            </div>

            <div className={style["price-area"]}>
              <h2>PREÇO</h2>
              <p className={style["txt-price"]}>
                {BRCurrency.format(Number(price))}
              </p>
            </div>

            <div className={style["description-area"]}>
              <h2>DESCRIÇÃO</h2>
              <p className={style["txt-description"]}>{description}</p>
            </div>
          </div>

          <div className={style["action-area"]}>
            <a href={`/loja/${slug}`} className={style["btn-link"]}>
              <RippleButton>Ir para Loja</RippleButton>
            </a>
            <RippleButton
              className={`${style["cta-btn"]}`}
              onClick={() => addProduct({ product, quantity: 1 })}
            >
              ADICIONAR AO CARRINHO
            </RippleButton>
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
