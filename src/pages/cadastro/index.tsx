import PFForm from "@/components/forms/PFForm";
import PJForm from "@/components/forms/PJForm";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import style from "./index.module.scss";

type UserRegistrationFormType = "PF" | "PJ";

type CadastroFormSelectorType = {
  formType: UserRegistrationFormType;
  setFormType: Dispatch<SetStateAction<UserRegistrationFormType>>;
};

const useCadastroFormSelectorHook = () => {
  const [formType, setFormType] = useState<UserRegistrationFormType>("PF");

  return {
    formType,
    setFormType,
  };
};

const CadastroFormSelector = ({
  formType,
  setFormType,
}: CadastroFormSelectorType) => {
  return (
    <div className={style["registration-type"]}>
      <div className={style.title}>
        <h1>Tipo de Cadastro</h1>
      </div>
      <div className={style["input-box"]}>
        <div className={style["input-group"]}>
          <input
            id="cb-pf"
            name="cb-pf"
            type="checkbox"
            checked={formType === "PF"}
            onChange={() => setFormType("PF")}
          />
          <label htmlFor="cb-pf">{`(PF) Pessoa Física`}</label>
        </div>
        <div className={style["input-group"]}>
          <input
            id="cb-pj"
            name="cb-pj"
            type="checkbox"
            checked={formType === "PJ"}
            onChange={() => setFormType("PJ")}
          />
          <label htmlFor="cb-pj">{`(PJ) Pessoa Jurídica`}</label>
        </div>
      </div>
    </div>
  );
};

const UserRegistrationPage: NextPageWithLayout = () => {
  const { formType, setFormType } = useCadastroFormSelectorHook();

  return (
    <main className={style.container}>
      <Head>
        <title>PackShop - Marketplace</title>
        <meta name="description" content="PackShop - Your new way to buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.content}>
        <CadastroFormSelector formType={formType} setFormType={setFormType} />
        {formType === "PF" ? <PFForm /> : <PJForm />}
      </div>
    </main>
  );
};

UserRegistrationPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default UserRegistrationPage;
