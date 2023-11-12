import { IBusinessResponse } from "./IBusinessResponse";

export interface IProfileResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isSubscribedToOffers: boolean;
  userAccountId: number;
  slug: string;
  business?: IBusinessResponse;
}
