import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { EAccountOriginType } from "../enums/EAccountOriginType";
import { EAccountRoleType } from "../enums/EAccountRoleType";
import { EStoreKeys } from "../enums/EStoreKeys";
import { IActionCallbackOptions } from "../interfaces/IActionCallbackOptions";
import { IUserAuthResponse } from "../responses/IUserAuthResponse";
import { AppAxios } from "../utilities/AppAxios";

export interface LocalUserCredential {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  accountId: number;
  profileId: number;
  businessId: number;
  consumerId: number;
  role: EAccountRoleType;
  origin: EAccountOriginType;
}

type StoreStatus = "idle" | "loading";

interface SessionContext {
  status: StoreStatus;
  error?: string;
  token?: string;
  user?: Partial<AuthenticatedUser>;
  signIn(
    credential: LocalUserCredential,
    options?: IActionCallbackOptions,
  ): Promise<void>;
  signOut(options?: IActionCallbackOptions): void;
}

export const useUserSessionStore = create<SessionContext>()(
  persist(
    // @ts-ignore
    (set, get) => {
      const signIn = async (
        credential: LocalUserCredential,
        options?: IActionCallbackOptions,
      ) => {
        set({ status: "loading" });

        const controller = new AbortController();
        const ep = "v1/auth/local";
        const result = await AppAxios.client
          .post<IUserAuthResponse>(ep, credential, {
            signal: controller.signal,
          })
          .then((result) => {
            options?.onSuccess?.();
            return result;
          })
          .catch((error) => {
            controller.abort();
            options?.onError?.();

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
          status: "idle",
          user: {
            accountId: data.user?.id,
            profileId: data.user?.profile?.id,
            businessId: data.user?.profile?.business?.id,
            consumerId: data.user?.profile?.consumer?.id,
            origin: data.user?.originType?.origin as EAccountOriginType,
            role: data.user?.roleType?.role as EAccountRoleType,
          },
        });

        AppAxios.setAuthHeader(data.accessToken);
      };

      const signOut = (options?: IActionCallbackOptions) => {
        set({
          status: "idle",
          error: "",
          token: "",
          user: undefined,
        });
        AppAxios.setAuthHeader();
        options?.onSuccess?.();
      };

      return {
        status: "idle",
        error: "",
        token: "",
        user: undefined,
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
