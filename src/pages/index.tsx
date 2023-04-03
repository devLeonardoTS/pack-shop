import BaseTemplate from "@/components/templates/BaseTemplate";
import BaseTemplateWithHooks from "@/components/templates/BaseTemplateWithHooks";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>PackShop - Home</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 style={{ textAlign: "center" }} data-test="msg-welcome">
          We are PackShop
        </h1>
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <BaseTemplate sampleTextProp="Soon delivering all kind of goods to you" />
          <BaseTemplateWithHooks />
        </div>
      </main>
    </>
  );
}
