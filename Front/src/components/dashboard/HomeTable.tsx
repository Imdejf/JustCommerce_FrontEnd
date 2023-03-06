import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
} from "../../types/userTypes";
import DataTable from "../common/dataTable/DataTable";

import HoldIco from "../../../assets/icons/status/hold.svg";
import VerifiedIco from "../../../assets/icons/status/verified.svg";
import HomeDataTable from "components/common/dataTable/HomeDataTable";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  playerProfiles: Array<PlayerProfileInterface>;
  sortBy: any;
}

const HomeTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  playerProfiles,
  sortBy,
}) => {
  const headers = [
    {
      name: "Imię",
      average: "",
    },
    {
      name: "Nazwisko",
      average: "",
    },
    {
      name: "Rocznik",
      average: "9999",
    },
    {
      name: "Liczba eventów w systemie",
      average: "99",
    },
    {
      name: "Intensywność",
      average: "99",
    },
    {
      name: "Forma",
      average: "99",
    },
    {
      name: "Dystans",
      average: "99",
    },
    {
      name: "Prędkość",
      average: "99",
    },
    {
      name: "Hsr",
      average: "99",
    },
    {
      name: "HMLD",
      average: "99",
    },
    {
      name: "Tętno",
      average: "99",
    },
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
          .sort((a: any, b: any) => compare(a, b, "Name"))
          .reverse();
      case 3:
        return array.slice().sort((a: any, b: any) => compare(a, b, "Name"));
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, playerProfiles);

  // const rows = sortedArray.map((player: any) => ({
  //   // data: { link: `/player-profiles/detail/${player.Id}` },
  //   cols: [
  //     "Jakub",
  //     "Kowalski",
  //     "2004",
  //     "99",
  //     "99",
  //     "99",
  //     "99",
  //     "99",
  //     "99",
  //     "99",
  //     "99",
  //   ],
  // }));

  const rows = [
    {
      cols: [
        "Jakub",
        "Kowalski",
        "2004",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
      ],
    },
    {
      cols: [
        "Jakub",
        "Kowalski",
        "2004",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
      ],
    },
    {
      cols: [
        "Jakub",
        "Kowalski",
        "2004",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
      ],
    },
    {
      cols: [
        "Jakub",
        "Kowalski",
        "2004",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
      ],
    },
    {
      cols: [
        "Jakub",
        "Kowalski",
        "2004",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
        "99",
      ],
    },
  ];

  return (
    <HomeDataTable
      rows={rows}
      headers={headers}
      isDataLoading={loading}
      containerRef={containerRef}
      lastItemRef={lastItemRef}
    />
  );
};

export default HomeTable;
