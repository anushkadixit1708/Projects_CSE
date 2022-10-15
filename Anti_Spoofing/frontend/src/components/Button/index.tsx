import CheckIcon from "remixicon-react/CheckFillIcon";
import CloseIcon from "remixicon-react/CloseLineIcon";
import AlertIcon from "remixicon-react/AlertFillIcon";
import LockPasswordFillIcon from "remixicon-react/LockPasswordFillIcon";
import DeleteBin5LineIcon from "remixicon-react/DeleteBin5LineIcon";
import PhoneFillIcon from "remixicon-react/PhoneFillIcon";
import MailFillIcon from "remixicon-react/MailFillIcon";
import RestartLineIcon from "remixicon-react/RestartLineIcon";
import SearchFillIcon from "remixicon-react/SearchLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";
import { MouseEventHandler } from "react";
// import { useContext } from "react";
// import { ModalThemeContext } from "../Modal";
import { useHistory } from "react-router";
// import linkClickHandler from "../../utils/linkClickHandler";
import LogoutBoxRLineIcon from "remixicon-react/LogoutBoxRLineIcon";
// import translate from "./translate.png";

const buttonIconsMap = {
  tick: <CheckIcon />,
  cross: <CloseIcon />,
  alert: <AlertIcon />,
  password: <LockPasswordFillIcon />,
  delete: <DeleteBin5LineIcon />,
  phone: <PhoneFillIcon />,
  mail: <MailFillIcon />,
  refresh: <RestartLineIcon />,
  search: <SearchFillIcon />,
  add: <AddLineIcon />,
  logout: <LogoutBoxRLineIcon />,
  //   translate: <Translate />,
};

type buttonIcons =
  | "tick"
  | "cross"
  | "alert"
  | "password"
  | "add"
  | "delete"
  | "mail"
  | "phone"
  | "refresh"
  | "search"
  | "logout";
//   | "translate";
const Button = ({
  size = "thick",
  variant = "filled",
  icon,
  placeIconLeft = true,
  onClick,
  theme = "primary",
  text,
  disabled = false,
  type = "submit",
  className = "",
  link,
}: {
  size?: "thick" | "thin";
  variant?: "filled" | "outline";
  theme?: "primary" | "danger" | "success";
  icon?: buttonIcons | null;
  placeIconLeft?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
  type?: "submit" | "button";
  className?: string;
  link?: string;
}) => {
  //   const modalTheme = useContext(ModalThemeContext);
  const history = useHistory();
  const finalTheme = theme;

  const sizeClasses =
    "px-5 " +
    (size === "thick"
      ? " py-1 py-3 md:text-body-1 text-body-3 "
      : "  py-1.5 text-body-4 md:text-body-3 ");

  const bgClasses =
    variant === "outline"
      ? ""
      : finalTheme === "primary"
      ? "bg-primary"
      : finalTheme === "success"
      ? "bg-success"
      : "bg-danger";

  const textClasses =
    variant === "outline"
      ? finalTheme === "danger"
        ? "text-danger"
        : "text-primary"
      : "text-white";

  const borderClasses =
    finalTheme === "danger"
      ? "border-danger"
      : finalTheme === "success"
      ? "border-success"
      : "border-primary";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={
        // link
        //   ? () => {
        //       linkClickHandler(link, history);
        //     }
        //       :
        onClick
      }
      className={`border-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex justify-center items-center rounded-small ${borderClasses} ${sizeClasses} ${bgClasses} ${textClasses} ${className}`}
    >
      <span className="pr-2">
        {icon && placeIconLeft && buttonIconsMap[icon]}
      </span>
      <span className="whitespace-nowrap">{text}</span>
      <span className="pl-2">
        {icon && !placeIconLeft && buttonIconsMap[icon]}
      </span>
    </button>
  );
};

export default Button;
