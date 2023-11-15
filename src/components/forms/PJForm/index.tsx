import { EAccountOriginType } from "@/common/enums/EAccountOriginType";
import { EEstado } from "@/common/enums/EEstado";
import { EHttpStatusCode } from "@/common/enums/EHttpStatusCode";
import { EImageType } from "@/common/enums/EImageType";
import { EPhoneType } from "@/common/enums/EPhoneType";
import {
  useCreateFullPjAccount,
  useCreateProfileImage,
} from "@/common/hooks/useAccountMutation";
import RippleButton from "@/components/common/RippleButton";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EBusinessType } from "../../../common/enums/EBusinessType";
import style from "./index.module.scss";

const PJForm = () => {
  const router = useRouter();

  const MySwal = withReactContent(Swal);

  const [imagePreview, setImagePreview] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();

  const {
    mutateAsync: createPjAccount,
    isSuccess: isPjAccountCreated,
    isLoading: isPjAccountCreationLoading,
    error: pjAccountCreationError,
  } = useCreateFullPjAccount();

  const {
    mutateAsync: createProfileImage,
    isSuccess: isProfileImageCreated,
    isLoading: isProfileImageCreationLoading,
    error: profileImageCreationError,
  } = useCreateProfileImage();

  const formik = useFormik({
    initialValues: {
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: "",
      dataAbertura: "",
      inscricaoEstadual: "",
      inscricaoMunicipal: "",
      businessType: "",
      addressTitle: "",
      addressDescription: "",
      pais: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      ownerName: "",
      ownerCpf: "",
      phoneNumber: "",
      phoneType: "",
      isUsageTermsAccepted: "",
      isPoliciesAccepted: "",
      isSubscribedToOffers: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log("[PJForm]: Creating PJ account data.");
      const accountResponse = await createPjAccount({
        originType: EAccountOriginType.LOCAL,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        isSubscribedToOffers: Boolean(values.isSubscribedToOffers),
        addressTitle: values.addressTitle,
        addressDescription: values.addressDescription,
        pais: values.pais,
        cep: values.cep,
        estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
        logradouro: values.logradouro,
        numero: values.numero,
        complemento: values.complemento,
        phone: values.phoneNumber,
        phoneType: values.phoneType as EPhoneType,
        cnpj: values.cnpj,
        dataAbertura: new Date(values.dataAbertura),
        inscricaoEstadual: values.inscricaoEstadual,
        inscricaoMunicipal: values.inscricaoMunicipal,
        nomeFantasia: values.nomeFantasia,
        razaoSocial: values.razaoSocial,
        businessType: values.businessType as EBusinessType,
        cpf: values.ownerCpf,
        fullName: values.ownerName,
      });

      if (accountResponse.data && imageFile instanceof File) {
        console.log(
          "[PJForm]: Creating PJ account image data.",
          accountResponse.data,
        );
        await createProfileImage({
          file: imageFile,
          profileId: accountResponse.data.profile.id,
          imageType: EImageType.PROFILE_AVATAR_1,
        });
      }
    },
  });

  useEffect(() => {
    if (imageFile && imageFile instanceof File) {
      setImagePreview(URL.createObjectURL(imageFile));
    } else if (imageFile) {
      setImagePreview(imageFile);
    } else {
      setImagePreview(undefined);
    }
  }, [imageFile]);

  useEffect(() => {
    if (isPjAccountCreationLoading || isProfileImageCreationLoading) {
      MySwal.fire({
        title: "Loading...",
        toast: true,
        showCloseButton: false,
        showConfirmButton: false,
        position: "bottom-right",
        didOpen: () => {
          MySwal.showLoading(null);
        },
      });
    }

    if (pjAccountCreationError) {
      const reqError = pjAccountCreationError as any;
      const error = reqError?.response?.data;

      console.log(reqError);

      let message;
      switch (reqError.statusCode) {
        case EHttpStatusCode.BAD_REQUEST:
          message =
            "Alguns dos dados são inválidos, verifique e tente novamente.";
          break;
        default:
          message = "Algo deu errado, tente novamente mais tarde";
          break;
      }

      MySwal.fire({
        title: <p>Ops...</p>,
        text: message,
        toast: true,
        position: "bottom-right",
        icon: "error",
      });
    }

    if (isPjAccountCreated) {
      MySwal.fire({
        title: <p>Usuário cadastrado!</p>,
        text: "Direcionando para a tela de Login...",
        toast: true,
        timerProgressBar: true,
        timer: 5000,
        position: "bottom-right",
        icon: "success",
        didClose: () => router.push("/login"),
      });
    }
  }, [
    isPjAccountCreated,
    isPjAccountCreationLoading,
    pjAccountCreationError,
    isProfileImageCreated,
    isProfileImageCreationLoading,
  ]);

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
            <legend>Dados do Negócio</legend>
            <div className={style["img-input-group"]}>
              <div className={style["btn-container"]}>
                <p>Clique para selecionar uma logomarca</p>
                <RippleButton className={style["btn"]}>
                  <label htmlFor="productImage">
                    <img
                      src={imagePreview || "./images/logomark.svg"}
                      height={192}
                      width={192}
                      alt={"Prévia da imagem do produto"}
                    />
                  </label>
                </RippleButton>
              </div>
              <input
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                hidden
                onChange={(ev) => {
                  setImageFile(ev.target.files?.[0]);
                }}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="razaoSocial">Razão Social *</label>
              <input
                type="text"
                id="razaoSocial"
                name="razaoSocial"
                onChange={formik.handleChange}
                value={formik.values.razaoSocial}
                required
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
                required
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
                maxLength={18}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="dataAbertura">
                Data de abertura da empresa *
              </label>
              <input
                type="date"
                id="dataAbertura"
                name="dataAbertura"
                onChange={formik.handleChange}
                value={formik.values.dataAbertura}
                required
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
                maxLength={14}
                required
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
                maxLength={15}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="businessType">Tipo de Negócio *</label>
              <select
                name="businessType"
                id="businessType"
                form="sign-in-form"
                onChange={formik.handleChange}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value={EBusinessType.SELLER}>Varejo</option>
                <option value={EBusinessType.RESELLER}>Revenda</option>
                <option value={EBusinessType.ARTISAN}>Artesanato</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <legend>Localização</legend>
            <div className={style["input-group"]}>
              <label htmlFor="addressTitle">Título *</label>
              <input
                type="text"
                id="addressTitle"
                name="addressTitle"
                onChange={formik.handleChange}
                value={formik.values.addressTitle}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="addressDescription">Descrição *</label>
              <textarea
                id="addressDescription"
                name="addressDescription"
                onChange={formik.handleChange}
                value={formik.values.addressDescription}
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="pais">País *</label>
              <input
                type="text"
                id="pais"
                name="pais"
                onChange={formik.handleChange}
                value={formik.values.pais}
                required
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
                maxLength={8}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="estado">UF *</label>
              <select
                name="estado"
                id="estado"
                form="sign-in-form"
                onChange={formik.handleChange}
                required
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
                required
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
                required
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
                required
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
                required
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
              <label htmlFor="ownerName">Nome do Responsável *</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                onChange={formik.handleChange}
                value={formik.values.ownerName}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="ownerCpf">CPF do Responsável *</label>
              <input
                type="text"
                id="ownerCpf"
                name="ownerCpf"
                onChange={formik.handleChange}
                value={formik.values.ownerCpf}
                maxLength={11}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="phoneNumber">Telefone de Contato *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                maxLength={15}
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="phoneType">Tipo de Telefone *</label>
              <select
                name="phoneType"
                id="phoneType"
                form="sign-in-form"
                onChange={formik.handleChange}
                required
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
                required
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
                required
              />
            </div>

            <div className={style["input-group"]}>
              <label htmlFor="confirmPassword">Confirme a Senha *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                required
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

export default PJForm;
