import { Defaults } from "@/common/constants/Defaults";
import { EImageType } from "@/common/enums/EImageType";
import {
  useConsumerData,
  useProfileImageData,
} from "@/common/hooks/useUserData";
import { useDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import { Drawer } from "@mui/material";
import { useRouter } from "next/router";
import { FaUserCog } from "react-icons/fa";
import OrdersArea from "../OrdersArea";
import style from "./index.module.scss";

export type ConsumerDrawerProps = {
  children?: React.ReactNode;
};

function ConsumerDrawer({ children }: ConsumerDrawerProps) {
  const { setDashboardContent } = useDashboardStore();

  const router = useRouter();

  const { user } = useUserSessionStore();

  const { data: consumerData } = useConsumerData(user?.consumerId || 0);
  const { fullName, socialName } = consumerData || {};

  const { data: profileImgData } = useProfileImageData(
    user?.profileId || 0,
    EImageType.PROFILE_AVATAR_1,
  );
  const { image } = profileImgData || {};

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
              alt={socialName ? `Avatar do ${socialName}` : "Avatar do usuário"}
              title={
                socialName ? `Avatar do ${socialName}` : "Avatar do usuário"
              }
            />
          </div>
        </div>
        <div className={style["text-group"]}>
          <p className={style["title"]}>{fullName}</p>
          <p className={style["store"]}>{socialName}</p>
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
            onClick={() => setDashboardContent(<OrdersArea />)}
          >
            PEDIDOS
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

export default ConsumerDrawer;
