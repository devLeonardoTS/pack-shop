import { IProfileResponse } from "./IProfileResponse";

export interface IBusinessResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  dataAbertura: Date;
  businessTypeId: number;
  profileId: number;
  businessType?: {
    id: number;
    type: string;
  };
  businessOwner?: {
    id: number;
    createdAt: number;
    updatedAt: number;
    cpf: string;
    fullName: string;
    businessId: number;
  };
  profile?: IProfileResponse;
}
