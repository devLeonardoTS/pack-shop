import styles from "./login-usu.module.scss"
import React, { useState } from "react";
import Image from "next/image";
import { AiFillFacebook } from "react-icons/ai";
import { SlSocialGoogle } from "react-icons/sl";
import { IoEarth } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { TbEyeClosed } from "react-icons/tb";
import Top_Infos_simples from "@/components/templates/topinfostemplate";
export default function Login_usu() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [eyeclose, seteyeclose] = useState({
        display:'block',
    });
     const [eyeopen, seteyeopen] = useState({
       display: "none",
     });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        seteyeclose({ ...eyeclose, display: passwordVisible ? "block" : "none" });
        seteyeopen({ ...eyeclose, display: !passwordVisible ? "block" : "none" });
    };
    return (
      <main className={styles.main_container_main}>
        <Top_Infos_simples/>
        <section className={styles.login_info_form}>
          <div className={styles.sou_cliente}>
            <h3>
              Login<span>Sou Cliente</span>
            </h3>
            <p>
              Bem-vindo(a)! Se você já comprou em nosso site anteriormente, por
              favor, informe/escolha uma das opções de login e senha.
            </p>
          </div>
          <div className={styles.login_metodohoods}>
            <form action="" method="get" className={styles.login_cliente}>
              <label htmlFor="">
                E-mail, CPF ou CNPJ
                <input type="text" name="" id="" />
              </label>

              <label htmlFor="">
                Senha
                <input
                  type={passwordVisible ? "text" : "password"}
                  name=""
                  id=""
                />
                <TbEyeClosed
                  onClick={togglePasswordVisibility}
                  style={eyeclose}
                />
                <SlEye onClick={togglePasswordVisibility} style={eyeopen} />
              </label>

              <a href="">Esqueci minha senha</a>
              <span>
                <button>ENTRAR</button>
                <a href="cadastro-usu">CRIAR CONTA</a>
              </span>
            </form>
            <div className={styles.external_metodos}>
              <span>OU</span>
              <div className={styles.login_facebook}>
                <AiFillFacebook /> FACEBOOK
              </div>
              <div className={styles.login_google}>
                <SlSocialGoogle /> GOOGLE
              </div>
            </div>
          </div>
        </section>
        <div className={styles.racoon_planet}>
          <IoEarth />
          <div></div>
          <Image
            className={styles.logo_main_header}
            priority
            src="/images/logo1-clean.svg"
            height={250}
            width={125}
            alt="Logo PackShoP"
          />
        </div>
      </main>
    );
}