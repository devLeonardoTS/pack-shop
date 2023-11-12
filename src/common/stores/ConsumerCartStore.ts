import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { EStoreKeys } from "../enums/EStoreKeys";

type CartProduct = {
  productId: number;
  quantity: number;
};

interface CartContext {
  products: CartProduct[];
  addProduct: (product: CartProduct) => Promise<any> | any;
  rmvProduct: (productId: number) => Promise<any> | any;
  updProduct: (productId: number, quantity: number) => Promise<any> | any;
  clearProducts: () => Promise<any> | any;
}

export const useConsumerCartStore = create<CartContext>()(
  persist(
    // @ts-ignore
    (set, get) => {
      return {
        products: [],
        addProduct: (product) => {
          const products = get().products;
          products.push(product);
          set({ products });
        },
        rmvProduct: (productId) => {
          const products = get().products;
          const newProducts = products.filter(
            (product) => product.productId !== productId,
          );
          set({ products: newProducts });
        },
        updProduct: (productId, quantity) => {
          const products = get().products;
          const newProducts = products.filter(
            (product) => product.productId !== productId,
          );
          const updated: CartProduct = { productId, quantity };
          newProducts.push(updated);
          set({ products: newProducts });
        },
        clearProducts: () => {
          set({ products: [] });
        },
      };
    },
    {
      name: EStoreKeys.CART_STORE as string,
      storage: createJSONStorage(() => localStorage),
      version: EStoreKeys.STORAGE_VERSION as number,
    },
  ),
);
