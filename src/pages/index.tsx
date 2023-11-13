import { useProductListData } from "@/common/hooks/useProductData";
import { useBusinessListData } from "@/common/hooks/useUserData";
import BusinessCard from "@/components/content/BusinessCard";
import ProductCard from "@/components/content/ProductCard";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { CircularProgress, Pagination } from "@mui/material";
import Head from "next/head";
import { ReactElement, useState } from "react";
import style from "./index.module.scss";
import { NextPageWithLayout } from "./_app";

const MarketplaceHome: NextPageWithLayout = () => {
  const [productPage, setProductPage] = useState(1);
  const [businessPage, setBusinessPage] = useState(1);

  const { data: productListQuery, isLoading: isProductListLoading } =
    useProductListData({
      page: productPage,
    });

  const { data: businessListQuery, isLoading: isBusinessListLoading } =
    useBusinessListData({
      page: businessPage,
    });

  return (
    <main className={style.container}>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <div className={style["header-area"]}>
          <h1>
            Boas compras na <span>PackShop</span>!
          </h1>
        </div>
        <hr className={`divider`} />
        <div className={style["product-list-area"]}>
          <h2 className={style["txt-title"]}>Novos Produtos</h2>

          <ul className={style["list"]}>
            {isProductListLoading ? (
              <li className={style["loading"]}>
                <CircularProgress />
              </li>
            ) : productListQuery?.data?.length ? (
              productListQuery.data.map((product) => (
                <ProductCard key={`product-${product.id}`} product={product} />
              ))
            ) : (
              <p>Os produtos ainda não estão disponíveis</p>
            )}
          </ul>
          <div className={style["pagination"]}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={productListQuery?.pages}
              page={productPage}
              onChange={(ev, value) => setProductPage(value)}
            />
          </div>
        </div>
        <hr className={`divider`} />
        <div className={style["business-list-area"]}>
          <h2 className={style["txt-title"]}>Novas Lojas</h2>

          <ul className={style["list"]}>
            {isBusinessListLoading ? (
              <li className={style["loading"]}>
                <CircularProgress />
              </li>
            ) : businessListQuery?.data?.length ? (
              businessListQuery.data.map((business) => (
                <BusinessCard
                  key={`business-${business.id}`}
                  business={business}
                />
              ))
            ) : (
              <p>Até o momento, nenhuma loja está disponíveis</p>
            )}
          </ul>
          <div className={style["pagination"]}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={productListQuery?.pages}
              page={productPage}
              onChange={(ev, value) => setBusinessPage(value)}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

MarketplaceHome.getLayout = function getLayout(page: ReactElement) {
  return <LayoutPrimary>{page}</LayoutPrimary>;
};

export default MarketplaceHome;
