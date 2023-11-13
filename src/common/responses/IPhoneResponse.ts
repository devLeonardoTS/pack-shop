export interface IPhoneResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  number: string;
  isPrimary: boolean;
  phoneTypeId: number;
  profileId: number;
}
