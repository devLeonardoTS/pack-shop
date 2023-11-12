export interface IProductResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  sku: string;
  name: string;
  description: string;
  brand: string;
  price: string;
  stock: number;
  weightKg: string;
  lengthCm: string;
  heightCm: string;
  widthCm: string;
  manufacturedAt: Date;
  expiresAt: Date;
  isAvailable: boolean;
  slug: string;
  productTypeId: number;
  businessId: number;
}
