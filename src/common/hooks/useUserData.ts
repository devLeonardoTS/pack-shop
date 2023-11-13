import { useQuery } from "@tanstack/react-query";
import { stringify } from "qs";
import { EImageType } from "../enums/EImageType";
import { IActionCallbackOptions } from "../interfaces/IActionCallbackOptions";
import { IPaginatedQueryOptions } from "../interfaces/IPaginatedQueryOptions";
import { IBusinessResponse } from "../responses/IBusinessResponse";
import { IConsumerResponse } from "../responses/IConsumerResponse";
import { IPaginatedResponse } from "../responses/IPaginatedResponse";
import { IProfileImageResponse } from "../responses/IProfileImageResponse";
import { AppAxios } from "../utilities/AppAxios";

const getBusinessListData = ({ queryKey }: any) => {
  const [key, options] = queryKey;

  const query = stringify({
    page: options?.page,
    limit: options?.limit,
    include: {
      businessType: true,
      businessOwner: true,
      profile: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return AppAxios.client.get<IPaginatedResponse<IBusinessResponse>>(
    `v1/business?${query}`,
  );
};

export const useBusinessListData = (
  options?: IPaginatedQueryOptions & IActionCallbackOptions,
) => {
  return useQuery(["business-list-data", options], getBusinessListData, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    select: (response) => {
      return response.data;
    },
  });
};

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

const getConsumerData = ({ queryKey }: any) => {
  const [key, resourceId] = queryKey;

  const query = stringify({});

  return AppAxios.client.get<IConsumerResponse>(
    `v1/consumer/${resourceId}?${query}`,
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
    onError: options?.onError,
    select: (response) => {
      return response.data;
    },
  });
};
export const useConsumerData = (
  resourceId: number,
  options?: IActionCallbackOptions,
) => {
  return useQuery(["consumer-data", resourceId], getConsumerData, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
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
      onError: options?.onError,
      select: (response) => {
        return response.data?.data[0];
      },
    },
  );
};
