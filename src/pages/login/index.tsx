import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { HydrationZustand } from "@/components/common/HydrationZustand";
import LoginForm from "@/components/forms/LoginForm";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import style from "./index.module.scss";

const LoginPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { user } = useUserSessionStore();

  useEffect(() => {
    if (user) {
      push("/");
    }
  }, [user]);

  // If user is authenticated, don't show login form.
  if (user) {
    return null;
  }

  // If not authenticated, show login form.
  return (
    <>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.container}>
        <div className={style.content}>
          <LoginForm />
        </div>
      </main>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutPrimary>
      <HydrationZustand>{page}</HydrationZustand>
    </LayoutPrimary>
  );
};

export default LoginPage;
