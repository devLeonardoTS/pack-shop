export interface IProfileImageResponse {
  id: number;
  profileId: number;
  imageId: number;
  image: {
    id: number;
    createdAt: string;
    publicId: string;
    width: number;
    height: number;
    imageUrl: string;
    imageTypeId: number;
    imageType: {
      id: number;
      type: string;
    };
  };
}
