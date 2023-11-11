import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import Head from "next/head";
import { ReactElement } from "react";
import style from "./index.module.scss";
import { NextPageWithLayout } from "./_app";

const MarketplaceHome: NextPageWithLayout = () => {
  return (
    <main className={style.container}>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <h1>Marketplace Front-Page</h1>
      </div>
    </main>
  );
};

MarketplaceHome.getLayout = function getLayout(page: ReactElement) {
  return <LayoutPrimary>{page}</LayoutPrimary>;
};

export default MarketplaceHome;
