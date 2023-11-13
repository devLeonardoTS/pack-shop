import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { HydrationZustand } from "@/components/common/HydrationZustand";
import PFForm from "@/components/forms/PFForm";
import PJForm from "@/components/forms/PJForm";
import LayoutPrimary from "@/components/layouts/LayoutPrimary";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import style from "./index.module.scss";

type UserRegistrationFormType = "PF" | "PJ";

type FormSelectorType = {
  formType: UserRegistrationFormType;
  setFormType: Dispatch<SetStateAction<UserRegistrationFormType>>;
};

const useFormSelectorHook = () => {
  const [formType, setFormType] = useState<UserRegistrationFormType>("PF");

  return {
    formType,
    setFormType,
  };
};

const CadastroFormSelector = ({ formType, setFormType }: FormSelectorType) => {
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
  const { formType, setFormType } = useFormSelectorHook();

  const { push } = useRouter();
  const { user } = useUserSessionStore();

  useEffect(() => {
    if (user) {
      push("/");
    }
  }, [user]);

  if (user) {
    return null;
  }

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
  return (
    <LayoutPrimary>
      <HydrationZustand>{page}</HydrationZustand>
    </LayoutPrimary>
  );
};

export default UserRegistrationPage;
