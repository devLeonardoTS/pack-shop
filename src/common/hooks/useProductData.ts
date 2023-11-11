import { useMutation } from "@tanstack/react-query";
import { EProductImageType } from "../enums/EProductImageType";
import { EProductType } from "../enums/EProductType";
import { AppAxios } from "../utilities/AppAxios";

export interface CreateProductImageRequest {
  file: File;
  imageType: EProductImageType;
  productId: number;
  imageId?: number;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  weightKg: number;
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  manufacturedAt: Date;
  expiresAt: Date;
  productType: EProductType;
  productCategories: string;
  productTags: string;
  isAvailable: boolean;
  businessId: number;
  slug?: string;
}

const createProduct = async (data: Partial<CreateProductRequest>) => {
  return AppAxios.client.post(`v1/business/${data.businessId}/product`, data);
};

const createProductImage = async (data: Partial<CreateProductImageRequest>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  return AppAxios.client.post(`v1/product/${data.productId}/image`, formData);
};

export const useCreateProduct = () => {
  return useMutation(createProduct);
};

export const useCreateProductImage = () => {
  return useMutation(createProductImage);
};
