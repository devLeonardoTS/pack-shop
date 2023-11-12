import { useBusinessDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { HydrationZustand } from "@/components/common/HydrationZustand";
import LayoutDashboard from "@/components/layouts/LayoutDashboard";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import style from "./index.module.scss";

const DashboardPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { user } = useUserSessionStore();

  const { content } = useBusinessDashboardStore();

  useEffect(() => {
    if (!user) {
      push("/");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content ? (
        content
      ) : (
        <main className={style.container}>
          <div className={style.content}>
            <h1>User's Dashboard</h1>
          </div>
        </main>
      )}
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutDashboard>
      <HydrationZustand>{page}</HydrationZustand>
    </LayoutDashboard>
  );
};

export default DashboardPage;
