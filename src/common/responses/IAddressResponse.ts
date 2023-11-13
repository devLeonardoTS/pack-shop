export interface IAddressResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  complemento: string;
  isPrimary: boolean;
  title: string;
  description: string;
  profileId: number;
}
