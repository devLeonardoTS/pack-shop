import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import LoginForm from "@/components/forms/LoginForm";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import style from "./index.module.scss";

const LoginPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { status } = useUserSessionStore();

  useEffect(() => {
    if (status === "signed") {
      push("/");
    }
  }, [status]);

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
