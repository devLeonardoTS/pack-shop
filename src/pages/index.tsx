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
              height={160}
              width={125}
              alt="Logo PackShoP"
            />
            <h1>PACKSHOP</h1>
          </div>
          <div className={styles.about_seemore}>
            <span>SOBRE NÓS</span>
            <span>
              ACESSE O MARKETPLACE
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.64625 0.647056L6.64685 0.646454C6.6932 0.600027 6.74825 0.563195 6.80884 0.538066C6.86944 0.512935 6.9344 0.5 7 0.5C7.0656 0.5 7.13056 0.512935 7.19116 0.538066C7.25175 0.563195 7.3068 0.600027 7.35315 0.646454L7.35345 0.646755L11.7069 5.0002L7.35345 9.35365C7.25971 9.44739 7.13257 9.50005 7 9.50005C6.86743 9.50005 6.74029 9.44739 6.64655 9.35365C6.55281 9.25991 6.50015 9.13277 6.50015 9.0002C6.50015 8.86763 6.55281 8.7405 6.64655 8.64676L8.93955 6.35375L9.79311 5.5002H8.586H1C0.867392 5.5002 0.740215 5.44752 0.646447 5.35375C0.552678 5.25999 0.5 5.13281 0.5 5.0002C0.5 4.86759 0.552678 4.74042 0.646447 4.64665C0.740215 4.55288 0.867392 4.5002 1 4.5002H8.586H9.79311L8.93955 3.64665L6.64655 1.35365L6.64625 1.35335C6.59983 1.307 6.56299 1.25195 6.53786 1.19136C6.51273 1.13076 6.4998 1.0658 6.4998 1.0002C6.4998 0.934601 6.51273 0.869643 6.53786 0.809046C6.56299 0.74845 6.59983 0.693403 6.64625 0.647056Z"
                  fill="black"
                  stroke="black"
                />
              </svg>
            </span>
          </div>
        </header>
        <section className={styles.main_header_section}>
          <h2 className={styles.main_titulo}>
            Encontre o que <span>você </span>
            procura
            <span>
              <br /> no melhor marketplace
              <br />
            </span>
            para suas compras
          </h2>
          <div className={styles.send_email_desk}>
            <h3>Saiba do lançamento antes de todo mundo!</h3>
            <form className={styles.entry_form_desk}>
              <p>Digite seu e-mail</p>
              <input placeholder="" />
              <button type="submit" aria-label="add-message-to-list-btn">
                Me avisa PackShop!
              </button>
            </form>
          </div>
        </section>

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
            <h3>
              &copy; 2022 - 2025 Croware-Tech Ltda. Todos os direitos
              reservados.
            </h3>
          </div>
        </footer>
      </main>
    </>
  );
}
