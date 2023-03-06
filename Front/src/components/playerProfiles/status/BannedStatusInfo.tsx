import { CSSProperties } from "react";
import HoldIco from "../../../assets/icons/status/hold.svg";
import VerifiedIco from "../../../assets/icons/status/verified.svg";

interface IProps {
  className?: string;
  isActive: boolean;
  style?: CSSProperties;
}

const BannedStatusInfo = ({ isActive, className = "", style }: IProps) => {
  const ico = isActive ? VerifiedIco : HoldIco;
  const label = isActive ? "Niezablokowany" : "Zablokowany";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 ${className}`}
      style={style}
      title={label}
    >
      <img src={ico} alt="" />{" "}
      <span className="truncate text-sm opacity-50">{label}</span>
    </div>
  );
};

export default BannedStatusInfo;
