import { EAccountOriginType } from "@/common/enums/EAccountOriginType";
import { EAccountRoleType } from "@/common/enums/EAccountRoleType";
import { EBusinessType } from "@/common/enums/EBusinessType";
import { EPhoneType } from "@/common/enums/EPhoneType";
import { AppAxios } from "@/common/utilities/AppAxios";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserAccountRequest {
  roleType: EAccountRoleType;
  originType: EAccountOriginType;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface CreateProfileRequest {
  isSubscribedToOffers: boolean;
  slug?: string;
  userAccountId?: number;
}

export interface CreateBusinessRequest {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataAbertura: Date;
  businessType: EBusinessType;
  profileId?: number;
}

export interface CreateBusinessOwnerRequest {
  cpf: string;
  fullName: string;
  businessId?: number;
}

export interface CreateAddressRequest {
  pais: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  isPrimaryAddress?: boolean;
  complemento?: string;
  title?: string;
  description?: string;
  profileId?: number;
}

export interface CreatePhoneRequest {
  phone: string;
  phoneType: EPhoneType;
  isPrimaryPhone?: boolean;
  profileId?: number;
}

const createAccount = (data: Partial<CreateUserAccountRequest>) => {
  return AppAxios.client.post("v1/user-account", data);
};

const createProfile = (data: Partial<CreateProfileRequest>) => {
  return AppAxios.client.post(
    `v1/user-account/${data.userAccountId}/profile`,
    data,
  );
};

const createBusiness = (data: Partial<CreateBusinessRequest>) => {
  return AppAxios.client.post(`v1/profile/${data.profileId}/business`, data);
};

const createBusinessOwner = (data: Partial<CreateBusinessOwnerRequest>) => {
  return AppAxios.client.post(`v1/business/${data.businessId}/owner`, data);
};

const createAddress = (data: Partial<CreateAddressRequest>) => {
  return AppAxios.client.post(`v1/profile/${data.profileId}/address`, data);
};

const createPhone = (data: Partial<CreatePhoneRequest>) => {
  return AppAxios.client.post(`v1/profile/${data.profileId}/phone`, data);
};

const createFullPjAccount = async (
  data: Partial<
    CreateUserAccountRequest &
      CreateProfileRequest &
      CreateBusinessRequest &
      CreateBusinessOwnerRequest &
      CreateAddressRequest &
      CreatePhoneRequest
  >,
) => {
  return AppAxios.client.post(`v1/user-account/pj`, data);
};

export const useCreateAccount = () => {
  return useMutation(createAccount);
};

export const useCreateProfile = () => {
  return useMutation(createProfile);
};

export const useCreateBusiness = () => {
  return useMutation(createBusiness);
};

export const useCreateBusinessOwner = () => {
  return useMutation(createBusinessOwner);
};

export const useCreateAddress = () => {
  return useMutation(createAddress);
};

export const useCreatePhone = () => {
  return useMutation(createPhone);
};

export const useCreateFullPjAccount = () => {
  return useMutation(createFullPjAccount);
};
