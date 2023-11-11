export interface IUserAuthResponse {
  accessToken: string;
  user?: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isConfirmed: boolean;
    email: string;
    roleTypeId: number;
    originTypeId: number;
    originType?: {
      id: number;
      createdAt: Date;
      origin: string;
    };
    roleType?: {
      id: number;
      createdAt: Date;
      role: string;
    };
    profile?: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      isSubscribedToOffers: boolean;
      userAccountId: number;
      slug: string;
      business?: {
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
      };
      consumer?: {
        id: number;
      };
      addresses?: {
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
        complemento: string | null;
        isPrimary: boolean;
        title: string | null;
        description: string | null;
        profileId: number;
      }[];
      phones?: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        number: string;
        isPrimary: boolean;
        phoneTypeId: number;
        profileId: number;
      }[];
      profileImages?: any[];
    };
  };
}
