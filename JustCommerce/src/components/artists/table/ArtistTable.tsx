import {
  ArtistStatus,
  IArtist,
  ArtistInterface,
} from "../../../types/artistTypes";
import DataTable from "../../common/dataTable/DataTable";
import ArtistProfileCell from "./ArtistProfileCell";
import ArtistProfileCell2 from "./ArtistProfileCell2";
import StatusInfo from "components/statusInfo/StatusInfo";

interface IArtistTableProps {
  artists: Array<ArtistInterface>;
  containerRef: any;
  lastItemRef: any;
  isDataLoading: boolean;
  sortBy: any;
}

const ArtistTable: React.FC<IArtistTableProps> = ({
  artists,
  containerRef,
  isDataLoading,
  lastItemRef,
  sortBy,
}) => {
  const headers = [
    "Login / e-mail",
    "Imię i nazwisko",
    "Profil Zawodnika",
    "Profil Trenera",
    "Status",
  ];

  const compare = (a: any, b: any, sort: any) => {
    if (a[sort] < b[sort]) {
      return 1;
    }
    if (a[sort] > b[sort]) {
      return -1;
    }
    return 0;
  };

  const sortingFunction = (type: number, array: any) => {
    switch (type) {
      case 0:
        return array.slice().reverse();
      case 1:
        return array;
      case 2:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "Email"))
          .reverse();
      case 3:
        return array.slice().sort((a: any, b: any) => compare(a, b, "Email"));
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, artists);

  const rows = sortedArray.map((artist: any) => ({
    //@ts-ignore
    data: { link: `/accounts/detail/${artist.Id}` },
    cols: [
      artist.Email,
      `${artist.FirstName} ${artist.LastName}`,
      <ArtistProfileCell IsPlayer={artist.IsPlayer} />,
      <ArtistProfileCell2 IsTrainer={artist.IsTrainer} />,
      <StatusInfo
        className="px-8 md:pl-1/10 lg:pl-2/10 2xl:pl-3/10"
        status={`${ArtistStatus[artist.Language]}`}
        IsActive={artist.IsActive}
      />,
    ],
  }));
  return (
    <DataTable
      rows={rows}
      headers={headers}
      isDataLoading={isDataLoading}
      containerRef={containerRef}
      lastItemRef={lastItemRef}
    />
  );
};

export default ArtistTable;
