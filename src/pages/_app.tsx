import Injectors from "@/components/common/Injectors";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import styles from "./app.module.scss";

import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`${inter.className} ${styles.container}`}>
      <Injectors>{getLayout(<Component {...pageProps} />)}</Injectors>
    </div>
  );
}
