import { useFormik } from "formik";
import { useRouter } from "next/router";
import style from "./index.module.scss";

const PFForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      dataAbertura: "",
      inscricaoEstadual: "",
      inscricaoMunicipal: "",
      businessType: "",
      pais: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      ownerName: "",
      phoneNumber: "",
      phoneType: "",
      isUsageTermsAccepted: "",
      isPoliciesAccepted: "",
      isSubscribedToOffers: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>{`CRIAÇÃO DE CONTA - (*) CAMPOS OBRIGATÓRIOS`}</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div className={style.content}>
          <fieldset>
            <legend>Dados do Negócio</legend>
            <div className={style["input-group"]}>
              <label htmlFor="razaoSocial">Razão Social *</label>
              <input
                type="text"
                id="razaoSocial"
                name="razaoSocial"
                onChange={formik.handleChange}
                value={formik.values.razaoSocial}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="nomeFantasia">Nome Fantasia *</label>
              <input
                type="text"
                id="nomeFantasia"
                name="nomeFantasia"
                onChange={formik.handleChange}
                value={formik.values.nomeFantasia}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="cnpj">CNPJ *</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                onChange={formik.handleChange}
                value={formik.values.cnpj}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="dataAbertura">
                Data de abertura da empresa *
              </label>
              <input
                type="text"
                id="dataAbertura"
                name="dataAbertura"
                onChange={formik.handleChange}
                value={formik.values.dataAbertura}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="inscricaoEstadual">Inscrição Estadual *</label>
              <input
                type="text"
                id="inscricaoEstadual"
                name="inscricaoEstadual"
                onChange={formik.handleChange}
                value={formik.values.inscricaoEstadual}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="inscricaoMunicipal">Inscrição Municipal *</label>
              <input
                type="text"
                id="inscricaoMunicipal"
                name="inscricaoMunicipal"
                onChange={formik.handleChange}
                value={formik.values.inscricaoMunicipal}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="businessType">Tipo de Negócio *</label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                onChange={formik.handleChange}
                value={formik.values.businessType}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Localização</legend>
            <div className={style["input-group"]}>
              <label htmlFor="pais">País *</label>
              <input
                type="text"
                id="pais"
                name="pais"
                onChange={formik.handleChange}
                value={formik.values.pais}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="cep">CEP *</label>
              <input
                type="text"
                id="cep"
                name="cep"
                onChange={formik.handleChange}
                value={formik.values.cep}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="estado">UF *</label>
              <input
                type="text"
                id="estado"
                name="estado"
                onChange={formik.handleChange}
                value={formik.values.estado}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="cidade">Cidade *</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                onChange={formik.handleChange}
                value={formik.values.cidade}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="bairro">Bairro *</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                onChange={formik.handleChange}
                value={formik.values.bairro}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="logradouro">Logradouro *</label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                onChange={formik.handleChange}
                value={formik.values.logradouro}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="numero">Número *</label>
              <input
                type="text"
                id="numero"
                name="numero"
                onChange={formik.handleChange}
                value={formik.values.numero}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="complemento">Complemento *</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                onChange={formik.handleChange}
                value={formik.values.complemento}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Administração</legend>
            <div className={style["input-group"]}>
              <label htmlFor="ownerName">Nome do Responsável *</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                onChange={formik.handleChange}
                value={formik.values.ownerName}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="phoneNumber">Telefone de Contato *</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="phoneType">Tipo de Telefone *</label>
              <input
                type="text"
                id="phoneType"
                name="phoneType"
                onChange={formik.handleChange}
                value={formik.values.phoneType}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Conta</legend>
            <div className={style["input-group"]}>
              <label htmlFor="email">E-mail *</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="password">Senha *</label>
              <input
                type="text"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="passwordConfirm">Confirme a Senha *</label>
              <input
                type="text"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Termos</legend>
            <div className={style["checkbox-group"]}>
              <input
                type="checkbox"
                id="isUsageTermsAccepted"
                name="isUsageTermsAccepted"
                onChange={formik.handleChange}
                value={formik.values.isUsageTermsAccepted}
              />
              <label htmlFor="isUsageTermsAccepted">
                Aceita nossos Termos de Uso?
              </label>
            </div>
            <div className={style["checkbox-group"]}>
              <input
                type="checkbox"
                id="isPoliciesAccepted"
                name="isPoliciesAccepted"
                onChange={formik.handleChange}
                value={formik.values.isPoliciesAccepted}
              />
              <label htmlFor="isPoliciesAccepted">
                Concorda com nossa Política de Privacidade?
              </label>
            </div>
            <div className={style["checkbox-group"]}>
              <input
                type="checkbox"
                id="isSubscribedToOffers"
                name="isSubscribedToOffers"
                onChange={formik.handleChange}
                value={formik.values.isSubscribedToOffers}
              />
              <label htmlFor="isSubscribedToOffers">
                Deseja receber ofertas?
              </label>
            </div>
          </fieldset>

          <div className={style["button-group"]}>
            <button type="button" onClick={() => router.back()}>
              VOLTAR
            </button>
            <button type="submit">REGISTRAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PFForm;
