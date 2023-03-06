import { CSSProperties } from "react";

import {
  ArtistStatus,
  artistStatusLabels,
  IArtist,
  ArtistInterface,
} from "../../types/artistTypes";

import HoldIco from "../../assets/icons/status/hold.svg";
import ProcessingIco from "../../assets/icons/status/processing.svg";
import UnverifiedIco from "../../assets/icons/status/unverified.svg";
import VerifiedIco from "../../assets/icons/status/verified.svg";

interface IProps {
  artist: ArtistInterface;
  className?: string;
  style?: CSSProperties;
  IsActive?: boolean;
}

const icons: Record<ArtistStatus, string> = {
  [ArtistStatus.Hold]: HoldIco,
  [ArtistStatus.Processing]: ProcessingIco,
  [ArtistStatus.Unverified]: UnverifiedIco,
  [ArtistStatus.Verified]: VerifiedIco,
};

const ArtistStatusInfo = ({ artist, className = "", style }: IProps) => {
  const ico = icons[0];
  const { label } = artistStatusLabels[0];

  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 ${className}`}
      style={style}
      title={label}
    >
      <img src={artist.IsActive ? VerifiedIco : HoldIco} alt="" />{" "}
      <span className="truncate text-sm opacity-50">
        {artist.IsActive ? "Aktywny" : "Nieaktywny"}
      </span>
    </div>
  );
};

export default ArtistStatusInfo;
