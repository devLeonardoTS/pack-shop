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

export const useCreateFullPjAccount = () => {
  return useMutation(createFullPjAccount);
};
