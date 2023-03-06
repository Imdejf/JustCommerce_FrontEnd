import { IArtist } from "../../../types/artistTypes";
import { iTunesUrl, spotifyUrl } from "../../../utils/constants/constants";
import SpotifyIco from "../../../assets/icons/lists/spotify.svg";
import ITunesIco from "../../../assets/icons/lists/itunes.svg";
import Verified from "../../../assets/icons/status/verified.svg";
import HoldIco from "../../../assets/icons/status/hold.svg";
import React from "react";

interface IProps {
  IsTrainer?: boolean;
}

const ArtistProfileCell2: React.FC<IProps> = ({ IsTrainer }) => {
  return (
    <div className="flex justify-center items-center gap-x-4">
      {IsTrainer ? (
        <img src={Verified} alt="Verified" />
      ) : (
        <img src={HoldIco} alt="Hold" />
      )}
    </div>
  );
};

export default ArtistProfileCell2;
