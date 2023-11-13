import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { EStoreKeys } from "../enums/EStoreKeys";
import { IProductResponse } from "../responses/IProductResponse";

export type CartItem = {
  [key: string]: any;
  product: IProductResponse;
  quantity: number;
};

interface CartContext {
  items: CartItem[];
  totalPrice: number;
  addProduct: (item: CartItem) => Promise<any> | any;
  rmvProduct: (productId: number) => Promise<any> | any;
  updProduct: (productId: number, quantity: number) => Promise<any> | any;
  updTotalPrice: () => Promise<any> | any;
  clearItems: () => Promise<any> | any;
}

export const useConsumerCartStore = create<CartContext>()(
  persist(
    // @ts-ignore
    (set, get) => {
      const addProduct = (item: CartItem) => {
        const targetIndex = get().items.findIndex(
          (el) => el.product.id === item.product.id,
        );

        if (targetIndex >= 0) {
          updProduct(item.product.id, get().items[targetIndex].quantity + 1);
          return;
        }

        set((s) => ({ items: [...s.items, item] }));
      };

      const rmvProduct = (productId: number) => {
        const items = get().items;
        const newItems = items.filter((item) => item.product.id !== productId);

        set({ items: newItems });
      };

      const updProduct = (productId: number, quantity: number) => {
        const targetIndex = get().items.findIndex(
          (item) => item.product.id === productId,
        );

        const items = [...get().items];

        if (targetIndex >= 0 && quantity < 1) {
          rmvProduct(items[targetIndex].product.id);
          return;
        }

        items[targetIndex].quantity = quantity;

        set({ items });
      };

      const updTotalPrice = () => {
        const items = get().items;
        const moneyValuesInCents = items.map(
          (item) => Number(item.product.price) * item.quantity * 100,
        );
        const sumInCents = moneyValuesInCents.reduce(
          (acumulator, currentValue) => acumulator + currentValue,
          0,
        );
        const totalPrice = sumInCents / 100;

        set({ totalPrice });
      };

      return {
        items: [],
        totalPrice: 0,
        addProduct,
        rmvProduct,
        updProduct,
        updTotalPrice,
        clearItems: () => {
          set({ items: [], totalPrice: 0 });
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
