import BaseEmailEnter from "@/components/templates/BaseEmailEnter";
import BaseTemplateWithHooks from "@/components/templates/BaseTemplateWithHooks";
import BasicBlockText from "@/components/templates/BasicBlockText";
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
      <main
        className="titulos"
        style={{
          padding: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            margin: "40px 0px -15px 0px",
            fontSize: "2.7em",
          }}
          data-test="msg-welcome"
        >
          RECEBA ATUALIZAÇÕES<br/>SOBRE NOSSO LANÇAMENTO
        </h1>
        <br />
        <div
          className="titulos"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "left",
          }}
        >
          <BaseEmailEnter />
          <BasicBlockText />
          {/* <BaseTemplateWithHooks /> */}
        </div>
      </main>
    </>
  );
}
