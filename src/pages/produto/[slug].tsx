import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import { IBusinessResponse } from "@/common/responses/IBusinessResponse";
import { IPaginatedResponse } from "@/common/responses/IPaginatedResponse";
import { IProductImageResponse } from "@/common/responses/IProductImageResponse";
import { IProductResponse } from "@/common/responses/IProductResponse";
import { AppAxios } from "@/common/utilities/AppAxios";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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
      product,
      productImages,
      business,
    },
  };
}) satisfies GetServerSideProps<ProductPageProps>;

const ProductPage = ({
  product,
  productImages,
  business,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();

  const BRCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
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
          <h1>Product's Page</h1>
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
          <p className={`txt-bold`}>{name}</p>
          <p>{description}</p>
          <p>
            <span className={`txt-bold`}>SKU: </span>
            {sku}
          </p>
          <p>
            <span className={`txt-bold`}>Preço: </span>
            {BRCurrency.format(Number(price))}
          </p>
          <p>
            <span className={`txt-bold`}>Estoque: </span>
            {stock}
          </p>
          <p>
            <span className={`txt-bold`}>Marca: </span>
            {brand}
          </p>

          <div>
            <a className={`btn-as-link`} href={`/loja/${slug}`}>
              Ir para Loja
            </a>
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
