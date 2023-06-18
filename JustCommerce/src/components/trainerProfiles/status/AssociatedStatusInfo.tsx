import { CSSProperties } from "react";
import HoldIco from "../../../assets/icons/status/hold.svg";
import VerifiedIco from "../../../assets/icons/status/verified.svg";

interface IProps {
  className?: string;
  isActive: boolean;
  style?: CSSProperties;
}

const AssociatedStatusInfo = ({ isActive, className = "", style }: IProps) => {
  const ico = isActive ? VerifiedIco : HoldIco;
  const label = isActive ? "Aktywny" : "Nieaktywny";

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={style}
      title={label}
    >
      <img src={ico} alt="" />{" "}
     
    </div>
  );
};

export default AssociatedStatusInfo;
