import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import { useBusinessProductListData } from "@/common/hooks/useProductData";
import { IBusinessResponse } from "@/common/responses/IBusinessResponse";
import { IPaginatedResponse } from "@/common/responses/IPaginatedResponse";
import { IProfileImageResponse } from "@/common/responses/IProfileImageResponse";
import { IProfileResponse } from "@/common/responses/IProfileResponse";
import { AppAxios } from "@/common/utilities/AppAxios";
import ProductCard from "@/components/content/ProductCard";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { CircularProgress, Pagination } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { stringify } from "qs";
import { ReactElement, useState } from "react";
import style from "./index.module.scss";

type BusinessPageProps = {
  // products: IPaginatedResponse<IProductResponse>;
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

  return {
    props: {
      // products,
      business: business || null,
      businessImage: businessImage || null,
    },
  };
}) satisfies GetServerSideProps<BusinessPageProps>;

const ProductPage = ({
  // products,
  business,
  businessImage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();

  const [productPage, setProductPage] = useState(1);

  const {
    razaoSocial,
    nomeFantasia,
    cnpj,
    profile,
    id: businessId,
  } = business || {};

  const { image } = businessImage || {};

  const { data: productListQuery, isLoading: isProductListLoading } =
    useBusinessProductListData(businessId || 0, {
      page: productPage,
    });

  const {
    data: productList,
    next,
    previous,
    pages,
    total,
  } = productListQuery || {};

  // const { data: productList, pages } = products || {};

  // const [csProductList, setCsProductList] = useState(productList);

  // const pageQuery = stringify({
  //   productPage,
  // });

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
          <div className={style["store-area"]}>
            <div className={style["header"]}>
              <h1>{razaoSocial}</h1>
            </div>

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
            <div className={style["text-group"]}>
              <p>{nomeFantasia}</p>
            </div>
          </div>

          <hr className={style["divider"]} />

          <div className={style["product-list-area"]}>
            <h2 className={style["txt-title"]}>Produtos</h2>

            <ul className={style["product-list"]}>
              {isProductListLoading ? (
                <li className={style["product-loading"]}>
                  <CircularProgress />
                </li>
              ) : productList?.length ? (
                productList.map((product) => (
                  <ProductCard
                    key={`product-${product.id}`}
                    product={product}
                  />
                ))
              ) : (
                <p>A loja ainda não adicionou produtos</p>
              )}
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
