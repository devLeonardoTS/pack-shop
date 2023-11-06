import Top_Infos_simples from "@/components/templates/topinfostemplate";
import styles from './cadastro-usu.module.scss'
import { useState } from "react";

export default function Cadastro_usu() {
  const [frompf, setformpf] = useState({
    left: "0%",
    checked:false,
  });
  const [frompj, setformpj] = useState({
    left: "100%",
    
  });

  const [pessoafisica, setpessoa] = useState(true);

  const settipopessoa = (pf: boolean) => {
    // setpessoa(!pessoafisica);
    if(pf)
    {
      setpessoa(false);
      setformpf({ ...frompf, left: "-100%"});
      setformpj({ ...frompf, left: "0%", });
    }
    else
    {
      setpessoa(true);
      setformpf({ ...frompf, left: "0%"});
      setformpj({ ...frompf, left: "100%" });
    }
  }

  
  return (
    <main className={styles.main_container}>
      <Top_Infos_simples />
      <h2>Tipo de cadastro:</h2>
      <div className={styles.main_cadastro_tipo}>
        <div className={styles.pf_pj}>
          <input
            type="radio"
            name="pfpj"
            id="pf"
            checked = {pessoafisica}
            onClick={() => {
              settipopessoa(false);
            }}
          />
          (PF) Pessoa Física
          <input
            type="radio"
            name="pfpj"
            id="pj"
            onClick={() => {
              settipopessoa(true);
            }}
          />
          (PJ) Pessoa jurídica
        </div>
        <form
          action=""
          method="post"
          className={styles.pessoa_fisica_register}
          style={frompf}
        >
          <h2>CRIAÇÃO DE CONTA - (*) CAMPOS OBRIGATÓRIOS</h2>
        </form>
        <form
          action=""
          method="post"
          className={styles.pessoa_juridica_register}
          style={frompj}
        >
          <h2>CRIAÇÃO DE CONTA - (*) CAMPOS OBRIGATÓRIOS2</h2>
        </form>
      </div>
    </main>
  );
}
