import { EEstado } from "@/common/enums/EEstado";
import { EPhoneType } from "@/common/enums/EPhoneType";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import style from "./index.module.scss";

const PFForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: undefined,
      socialName: undefined,
      cpf: undefined,
      birthDate: undefined,
      pais: undefined,
      cep: undefined,
      estado: undefined,
      cidade: undefined,
      bairro: undefined,
      logradouro: undefined,
      numero: undefined,
      complemento: undefined,
      phoneNumber: undefined,
      phoneType: undefined,
      isUsageTermsAccepted: undefined,
      isPoliciesAccepted: undefined,
      isSubscribedToOffers: undefined,
      email: undefined,
      password: undefined,
      passwordConfirm: undefined,
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>{`CRIAÇÃO DE CONTA - (*) CAMPOS OBRIGATÓRIOS`}</h2>
      </div>
      <form
        id="sign-in-form"
        onSubmit={formik.handleSubmit}
        className={style.form}
      >
        <div className={style.content}>
          <fieldset>
            <legend>Seu Perfil</legend>
            <div className={style["input-group"]}>
              <label htmlFor="fullName">Nome Completo *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="socialName">Apelido *</label>
              <input
                type="text"
                id="socialName"
                name="socialName"
                onChange={formik.handleChange}
                value={formik.values.socialName}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="cpf">CPF *</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                onChange={formik.handleChange}
                value={formik.values.cpf}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="birthDate">Data de nascimento *</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                onChange={formik.handleChange}
                value={formik.values.birthDate}
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
              <select
                name="estado"
                id="estado"
                form="sign-in-form"
                onChange={formik.handleChange}
              >
                <option value="">Selecione um estado</option>
                {Object.entries(EEstado).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
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
              <label htmlFor="complemento">Complemento</label>
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
            <legend>Contato</legend>

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
              <select
                name="phoneType"
                id="phoneType"
                form="sign-in-form"
                onChange={formik.handleChange}
              >
                <option value="">Selecione um tipo</option>
                {Object.entries(EPhoneType).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <legend>Conta</legend>
            <div className={style["input-group"]}>
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="password">Senha *</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="passwordConfirm">Confirme a Senha *</label>
              <input
                type="password"
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
                required
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
                required
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
