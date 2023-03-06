import { IArtist, ArtistInterface } from "../../types/artistTypes";
import ArtistListItem from "./ArtistListItem";

interface IArtistsListProps {
  artists: Array<ArtistInterface>;
  isDataLoading: boolean;
  lastItemRef: any;
  containerRef: any;
}

const ArtistsList: React.FC<IArtistsListProps> = ({
  artists,
  isDataLoading,
  lastItemRef,
  containerRef,
}) => {
  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px",
      }}
      className="flex flex-col md:grid gap-8 px-8 md:px-36 md:py-24"
      ref={containerRef}
    >
      {artists.map((artist, index) => {
        const isLast = index === artists.length - 1;
        return isLast ? (
          <ArtistListItem
            key={artist.Id}
            artist={artist}
            innerRef={lastItemRef}
          />
        ) : (
          <ArtistListItem key={artist.Id} artist={artist} />
        );
      })}
      <div>{isDataLoading && "Loading..."} </div>
    </div>
  );
};

export default ArtistsList;
