import { ButtonBase } from "@mui/material";
import { ButtonBaseProps } from "@mui/material/ButtonBase";

export type RippleButtonProps = ButtonBaseProps;

const RippleButton = ({ children, ...others }: RippleButtonProps) => {
  return <ButtonBase {...others}>{children}</ButtonBase>;
};

export default RippleButton;
