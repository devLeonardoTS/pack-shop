import { useQuery } from "@tanstack/react-query";
import { stringify } from "qs";
import { EImageType } from "../enums/EImageType";
import { IActionCallbackOptions } from "../interfaces/IActionCallbackOptions";
import { IBusinessResponse } from "../responses/IBusinessResponse";
import { IPaginatedResponse } from "../responses/IPaginatedResponse";
import { IProfileImageResponse } from "../responses/IProfileImageResponse";
import { AppAxios } from "../utilities/AppAxios";

const getBusinessData = ({ queryKey }: any) => {
  const [key, businessId] = queryKey;

  const query = stringify({
    include: {
      businessType: true,
      businessOwner: true,
    },
  });

  return AppAxios.client.get<IBusinessResponse>(
    `v1/business/${businessId}?${query}`,
  );
};

const getProfileImageData = ({ queryKey }: any) => {
  const [key, profileId, imageType] = queryKey;

  const query = stringify({
    image: {
      imageType: {
        type: imageType,
      },
    },
  });

  return AppAxios.client.get<IPaginatedResponse<IProfileImageResponse>>(
    `v1/profile/${profileId}/image?${query}`,
  );
};

export const useBusinessData = (
  businessId: number,
  options?: IActionCallbackOptions,
) => {
  return useQuery(["business-data", businessId], getBusinessData, {
    onSuccess: options?.onSuccess,
    onError: options?.onFailure,
    select: (response) => {
      return response.data;
    },
  });
};

export const useProfileImageData = (
  profileId: number,
  imageType: EImageType,
  options?: IActionCallbackOptions,
) => {
  return useQuery(
    ["profile-image-data", profileId, imageType],
    getProfileImageData,
    {
      onSuccess: options?.onSuccess,
      onError: options?.onFailure,
      select: (response) => {
        return response.data?.data[0];
      },
    },
  );
};
