import { EAccountOriginType } from "../enums/EAccountOriginType";
import { EAccountRoleType } from "../enums/EAccountRoleType";
import { IAddressResponse } from "./IAddressResponse";
import { IBusinessResponse } from "./IBusinessResponse";
import { IConsumerResponse } from "./IConsumerResponse";
import { IPhoneResponse } from "./IPhoneResponse";

export interface IAccountCreationResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isConfirmed: boolean;
  email: string;
  password: string;
  roleTypeId: number;
  originTypeId: number;
  originType: {
    id: number;
    createdAt: Date;
    origin: EAccountOriginType;
  };
  roleType: {
    id: number;
    createdAt: Date;
    role: EAccountRoleType;
  };
  profile: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isSubscribedToOffers: boolean;
    userAccountId: number;
    slug: string;
    business?: IBusinessResponse;
    consumer?: IConsumerResponse;
    addresses?: IAddressResponse[];
    phones?: IPhoneResponse[];
  };
}
