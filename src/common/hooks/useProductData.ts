import { useQuery } from "@tanstack/react-query";
import { stringify } from "qs";
import { EImageType } from "../enums/EImageType";
import { IActionCallbackOptions } from "../interfaces/IActionCallbackOptions";
import { IPaginatedQueryOptions } from "../interfaces/IPaginatedQueryOptions";
import { IPaginatedResponse } from "../responses/IPaginatedResponse";
import { IProductImageResponse } from "../responses/IProductImageResponse";
import { IProductResponse } from "../responses/IProductResponse";
import { AppAxios } from "../utilities/AppAxios";

const getProductListData = ({ queryKey }: any) => {
  const [key, options] = queryKey;

  const query = stringify({
    page: options?.page,
    limit: options?.limit,
    orderBy: {
      id: "desc",
    },
  });

  return AppAxios.client.get<IPaginatedResponse<IProductResponse>>(
    `v1/product?${query}`,
  );
};

export const useProductListData = (
  options?: IPaginatedQueryOptions & IActionCallbackOptions,
) => {
  return useQuery(["product-list-data", options], getProductListData, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    select: (response) => {
      return response.data;
    },
  });
};

const getBusinessProductListData = ({ queryKey }: any) => {
  const [key, businessId, options] = queryKey;

  const query = stringify({
    page: options?.page,
    limit: options?.limit,
    orderBy: {
      id: "desc",
    },
    // include: {
    //   productImages: {
    //     include: {
    //       image: {
    //         include: {
    //           imageType: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  return AppAxios.client.get<IPaginatedResponse<IProductResponse>>(
    `v1/business/${businessId}/product?${query}`,
  );
};

export const useBusinessProductListData = (
  resourceId: number,
  options?: IPaginatedQueryOptions & IActionCallbackOptions,
) => {
  return useQuery(
    ["product-list-data", resourceId, options],
    getBusinessProductListData,
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
      select: (response) => {
        return response.data;
      },
    },
  );
};

const getProductData = ({ queryKey }: any) => {
  const [key, options] = queryKey;

  const query = stringify({});

  return AppAxios.client.get<IProductResponse>(
    `v1/product/${options?.resourceId}?${query}`,
  );
};

export const useProductData = (
  options?: { resourceId: number } & IActionCallbackOptions,
) => {
  return useQuery(["product-data", options], getProductData, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    select: (response) => {
      return response.data;
    },
  });
};

const getProductImageData = ({ queryKey }: any) => {
  const [key, resourceId, options] = queryKey;

  const query = stringify({
    page: options?.page,
    limit: options?.limit,
    image: {
      imageType: {
        type: options?.imageType,
      },
    },
  });

  return AppAxios.client.get<IPaginatedResponse<IProductImageResponse>>(
    `v1/product/${resourceId}/image?${query}`,
  );
};

export const useProductImageData = (
  resourceId: number,
  options?: { imageType: EImageType } & IPaginatedQueryOptions &
    IActionCallbackOptions,
) => {
  return useQuery(
    ["product-image-data", resourceId, options],
    getProductImageData,
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
      select: (response) => {
        return response.data?.data[0];
      },
    },
  );
};
