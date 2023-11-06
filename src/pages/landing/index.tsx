import Footer from "@/components/layouts/Footer";
import LPNavbar from "@/components/layouts/Navbars/LPNavbar";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import style from "./index.module.scss";

export type LandingPageLayoutProps = {
  children?: React.ReactNode;
};

function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <>
      <LPNavbar />
      {children}
      <Footer />
    </>
  );
}

const LandingPage: NextPageWithLayout = () => {
  return (
    <main className={style.container}>
      <Head>
        <title>PackShop - Welcome</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <h1>PackShop Marketplace</h1>
        <h2>
          Encontre o que <span className={`c-accent`}>você</span> procura no{" "}
          <span className={`c-accent`}>melhor marketplace</span> para suas
          compras
        </h2>
      </div>
    </main>
  );
};

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export default LandingPage;
