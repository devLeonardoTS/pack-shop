import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import { useProfileImageData } from "@/common/hooks/useUserData";
import { IBusinessResponse } from "@/common/responses/IBusinessResponse";
import RippleButton from "@/components/common/RippleButton";
import { useRouter } from "next/router";
import style from "./index.module.scss";

export type BusinessListItemProps = {
  business: IBusinessResponse;
};

function BusinessListItem({ business }: BusinessListItemProps) {
  const router = useRouter();

  const { data: businessImageQuery } = useProfileImageData(
    business.profileId,
    EImageType.PROFILE_AVATAR_1,
  );

  const { image } = businessImageQuery || {};

  const { razaoSocial, nomeFantasia, profile } = business || {};

  const NumberFormatter = new Intl.NumberFormat("pt-BR");

  return (
    <li className={style["container"]}>
      <RippleButton>
        <a href={`/loja/${profile?.slug}`} className={style["image-area"]}>
          <div className={style["image-box"]}>
            <img
              src={image?.imageUrl || Defaults.Placeholders.avatar}
              width={128}
              height={128}
              alt={
                nomeFantasia
                  ? `Logomarca da ${nomeFantasia}`
                  : "Logomarca da loja"
              }
              title={
                nomeFantasia
                  ? `Logomarca da ${nomeFantasia}`
                  : "Logomarca da loja"
              }
            />
          </div>
        </a>
      </RippleButton>
      <hr />
      <div className={style["text-area"]}>
        <a
          className={`link line-clamped ${style["txt-title"]}`}
          href={`/loja/${profile?.slug}`}
        >
          {nomeFantasia}
        </a>
      </div>
      <div className={style["action-area"]}>
        <a href={`/loja/${profile?.slug}`} className={style["btn-link"]}>
          <RippleButton>Ir para Loja</RippleButton>
        </a>
      </div>
    </li>
  );
}

export default BusinessListItem;
