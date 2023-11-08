import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AppAxios } from "../utilities/AppAxios";
import { EStoreKeys } from "./EStoreKeys";

export interface LocalUserCredential {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  accountId: number;
  profileId: number;
  businessId: number;
  consumerId: number;
}

type StoreStatus = "unsigned" | "loading" | "signed";

interface ActionCallbackOptions {
  onSuccess?: () => Promise<void> | void;
  onFailure?: () => Promise<void> | void;
}

interface SessionContext {
  status: StoreStatus;
  error?: string;
  token?: string;
  userId?: number;
  signIn(
    credential: LocalUserCredential,
    options?: ActionCallbackOptions,
  ): Promise<void>;
  signOut(options?: ActionCallbackOptions): void;
}

export const useUserSessionStore = create<SessionContext>()(
  persist(
    // @ts-ignore
    (set, get) => {
      const signIn = async (
        credential: LocalUserCredential,
        options?: ActionCallbackOptions,
      ) => {
        set({ status: "loading" });

        const controller = new AbortController();
        const ep = "v1/auth/local";
        const result = await AppAxios.client
          .post(ep, credential, { signal: controller.signal })
          .then((result) => {
            options?.onSuccess?.();
            return result;
          })
          .catch((error) => {
            controller.abort();
            options?.onFailure?.();

            const errorData =
              error.response.data || error.request || error.message;
            const errorMessage = error.response.data.message || error.message;

            set({ error: errorMessage });

            console.log(
              "[UserSessionStore:SignIn] - Falha na autenticação.",
              errorData,
            );
          });

        if (!result) {
          return signOut();
        }

        const { data } = result;

        set({
          token: data.accessToken,
          error: "",
          status: "signed",
          userId: data.user.id,
        });

        AppAxios.setAuthHeader(data.accessToken);
      };

      const signOut = (options?: ActionCallbackOptions) => {
        set({
          status: "unsigned",
          error: "",
          token: "",
          userId: undefined,
        });
        AppAxios.setAuthHeader();
        options?.onSuccess?.();
      };

      return {
        status: "unsigned",
        error: "",
        token: "",
        userId: undefined,
        signIn,
        signOut,
      };
    },
    {
      name: EStoreKeys.USER_SESSION as string,
      storage: createJSONStorage(() => localStorage),
      version: EStoreKeys.STORAGE_VERSION as number,
    },
  ),
);
