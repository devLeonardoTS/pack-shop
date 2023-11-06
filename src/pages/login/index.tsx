import LoginForm from "@/components/forms/LoginForm";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { ReactElement } from "react";
import style from "./index.module.scss";

const LoginPage: NextPageWithLayout = () => {
  return (
    <main className={style.container}>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <LoginForm />
      </div>
    </main>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default LoginPage;
