import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import {
  useBusinessData,
  useProfileImageData,
} from "@/common/hooks/useUserData";
import { useBusinessDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
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
        <div className={style["image-box"]}>
          <img
            src={image?.imageUrl || Defaults.Placeholders.avatar}
            width={128}
            height={128}
          />
        </div>
        <div className={style["text-group"]}>
          <p className={style["title"]}>{razaoSocial}</p>
          <p className={style["store"]}>{nomeFantasia}</p>
        </div>
        <menu className={style.menu}>
          <li>
            <button onClick={() => {}}>
              <FaUserCog />
            </button>
          </li>
        </menu>
      </div>

      <hr />
      <menu className={style["main-menu"]}>
        <li>
          <button onClick={() => setDashboardContent()}>DASHBOARD</button>
        </li>
        <li>
          <button onClick={() => setDashboardContent(<ProductFormArea />)}>
            PRODUTOS
          </button>
        </li>
      </menu>
      <hr />
      <menu className={style["secondary-menu"]}>
        <li>
          <button onClick={() => router.push("/")}>VOLTAR</button>
        </li>
      </menu>
      <div className={style["footer"]}></div>
    </Drawer>
  );
}

export default SellerDrawer;
