import React, { CSSProperties } from "react";

import HoldIco from "assets/icons/status/hold.svg";
import ProcessingIco from "assets/icons/status/processing.svg";
import UnverifiedIco from "assets/icons/status/unverified.svg";
import VerifiedIco from "assets/icons/status/verified.svg";

interface Props {
  status: string;
  className?: string;
  style?: CSSProperties;
  IsActive?: boolean;
}

const icons: Record<string, string> = {
  Active: VerifiedIco,
  Draft: UnverifiedIco,
  Hold: HoldIco,
  Processing: UnverifiedIco,
  Revoked: ProcessingIco,
  Unverified: UnverifiedIco,
  Withdrawn: ProcessingIco,
  Verified: VerifiedIco,
  true: VerifiedIco,
  false: HoldIco,
};

const labels: Record<keyof typeof icons, string> = {
  Active: "Aktywny",
  Draft: "Draft/Projekt",
  Hold: "Zawieszony",
  Processing: "Przetwarzanie",
  Revoked: "Wycofany",
  Unverified: "Nieaktywny",
  Withdrawn: "Wycofany",
  Verified: "Aktywny",
  true: "Aktywny",
  false: "Nieaktywny",
};

const StatusInfo = ({ className = "", style, IsActive }: Props) => {
  return (
    <div
      className={`flex  items-center gap-x-2 whitespace-nowrap ${className}`}
      style={style}
    >
      <img src={IsActive ? VerifiedIco : HoldIco} alt="" />{" "}
      <span className="truncate text-sm opacity-50">
        {IsActive ? "Aktywny" : "Nieaktywny"}
      </span>
    </div>
  );
};

export default StatusInfo;
