import Injectors from "@/components/common/Injectors";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={inter.className}
      style={{
        height: "100%",
      }}
    >
      <Injectors>
        <PrimaryLayout>
          <Component {...pageProps} />
        </PrimaryLayout>
      </Injectors>
    </div>
  );
}
