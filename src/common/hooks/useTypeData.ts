import { useQuery } from "@tanstack/react-query";
import { IActionCallbackOptions } from "../interfaces/IActionCallbackOptions";
import { AppAxios } from "../utilities/AppAxios";

const getImageTypes = () => {
  return AppAxios.client.get("v1/types/image");
};

export const useImageTypeData = (options?: IActionCallbackOptions) => {
  useQuery("image-type" as any, getImageTypes, {
    onSuccess: options?.onSuccess,
    onError: options?.onFailure,
    select: (response) => {
      const result = response.data.map((imageType: any) => imageType.type);
      return result;
    },
  });
};
