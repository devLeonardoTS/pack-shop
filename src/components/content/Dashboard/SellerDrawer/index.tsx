import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import {
  useBusinessData,
  useProfileImageData,
} from "@/common/hooks/useUserData";
import { useBusinessDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import { Drawer } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaUserCog } from "react-icons/fa";
import ProductFormArea from "../ProductFormArea";
import style from "./index.module.scss";

export type SellerDrawerProps = {
  children?: React.ReactNode;
};

function SellerDrawer({ children }: SellerDrawerProps) {
  const { setDashboardContent } = useBusinessDashboardStore();

  const router = useRouter();

  const { user } = useUserSessionStore();

  const { data: businessQuery } = useBusinessData(user?.businessId || 0);
  const { razaoSocial, nomeFantasia } = businessQuery || {};

  const { data: profileImgQuery } = useProfileImageData(
    user?.profileId || 0,
    EImageType.PROFILE_AVATAR_1,
  );
  const { image } = profileImgQuery || {};

  useEffect(() => {
    console.log(profileImgQuery);
  }, []);

  return (
    <Drawer
      variant="permanent"
      classes={{ root: style["drawer"], paper: style["drawer"] }}
    >
      <div className={style.header}>
        <div className={style["image-area"]}>
          <div className={style["image-box"]}>
            <img
              src={image?.imageUrl || Defaults.Placeholders.avatar}
              width={128}
              height={128}
              alt={`Logomarca da ${nomeFantasia}` || "Logomarca da loja"}
              title={`Logomarca da ${nomeFantasia}` || "Logomarca da loja"}
            />
          </div>
        </div>
        <div className={style["text-group"]}>
          <p className={style["title"]}>{razaoSocial}</p>
          <p className={style["store"]}>{nomeFantasia}</p>
        </div>
        <menu className={style["horizontal-menu"]}>
          <li>
            <RippleButton className={`ripple-btn rounded`} onClick={() => {}}>
              <FaUserCog className={style["btn-icon"]} />
            </RippleButton>
          </li>
        </menu>
      </div>

      <hr />
      <menu className={style["main-menu"]}>
        <li>
          <RippleButton
            className={`ripple-btn`}
            onClick={() => setDashboardContent()}
          >
            DASHBOARD
          </RippleButton>
        </li>
        <li>
          <RippleButton
            className={`ripple-btn`}
            onClick={() => setDashboardContent(<ProductFormArea />)}
          >
            PRODUTOS
          </RippleButton>
        </li>
      </menu>
      <hr />
      <menu className={style["secondary-menu"]}>
        <li>
          <RippleButton
            className={`ripple-btn rounded-sm`}
            onClick={() => router.push("/")}
          >
            VOLTAR
          </RippleButton>
        </li>
      </menu>
      <div className={style["footer"]}></div>
    </Drawer>
  );
}

export default SellerDrawer;
