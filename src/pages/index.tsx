import BaseEmailEnter from "@/components/templates/BaseEmailEnter";
// import logo from "./images/logo1.svg"
import styles from "./index.module.scss"
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>PackShop - Home</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main_container}>
        <header className={styles.main_header}>
          <div className={styles.logo_titulo}>
            <Image
              className={styles.logo_main_header}
              priority
              src="/images/logo.svg"
              height={125}
              width={125}
              alt="Logo PackShoP"
            />
            <h1>
              PACK <br />
              SHOP
            </h1>
          </div>
          <h1 className={styles.welcome}>SEJA BEM-VINDO(A)</h1>
        </header>
        <h2 className={styles.main_titulo}>
          RECEBA ATUALIZAÇÕES
          <br />
          SOBRE NOSSO LANÇAMENTO!
        </h2>
        <br />
        <div className={styles.send_email}>
          <BaseEmailEnter />
        </div>
        <div className={styles.about_us}>
          <h2>PackShop, encontre o que você precisa, venda e sem limites.</h2>
          <div className={styles.block_copy}>
            <p>
              Redefinindo sua experiência de compras com produtos bem
              detalhados, filtros bem definidos, tendo uma das menores taxas e
              maiores benefícios do mercado.
            </p>
          </div>
        </div>
        <footer className={styles.end_main_infos}>
          <div className={styles.real_footer}>
            <h3>CROWARE TECH LTDA &copy;</h3>
          </div>
        </footer>
      </main>
    </>
  );
}
