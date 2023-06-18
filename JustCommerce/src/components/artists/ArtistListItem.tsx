import TileViewLinkItem from "components/common/tileView/TileViewLinkItem";

import { ArtistLabels, IArtist, ArtistInterface } from "types/artistTypes";
import { ReactComponent as SpotifyIco } from "assets/icons/lists/spotify.svg";
import { ReactComponent as ITunesIco } from "assets/icons/lists/itunes.svg";

import ArtistStatusInfo from "./ArtistStatusInfo";

interface IArtistListItemProps {
  artist: ArtistInterface;
  innerRef?: any;
}

const ArtistListItem: React.FC<IArtistListItemProps> = ({
  artist,
  innerRef,
}) => {
  return (
    <TileViewLinkItem
      title={artist.FirstName}
      img=""
      link={`/accounts/detail/${artist.Id}`}
      content={
        <>
          <div className="tileInfo">
            <div className="my-1">
              <span className="tileInfo__label">{ArtistLabels.fullName}</span>
              <span>
                {artist.FirstName} {artist.LastName}
              </span>
            </div>

            <div className="my-1">
              <span className="tileInfo__label">{ArtistLabels.email}</span>
              <span>{artist.Email}</span>
            </div>

            <div className="flex gap-x-4 ">
              <span className="tileInfo__label">
                {ArtistLabels.phoneNumber}
              </span>
              <span className="flex gap-x-4 w-min">{artist.PhoneNumber}</span>
            </div>
          </div>
          <ArtistStatusInfo className="justify-self-end" artist={artist} />
        </>
      }
    />
  );
};

export default ArtistListItem;
