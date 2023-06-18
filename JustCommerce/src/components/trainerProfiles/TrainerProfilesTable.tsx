import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
} from "../../types/userTypes";
import DataTable from "../common/dataTable/DataTable";
import UserStatusInfo from "./status/UserStatusInfo";
import HoldIco from "../../../assets/icons/status/hold.svg";
import VerifiedIco from "../../../assets/icons/status/verified.svg";
import AssociatedStatusInfo from "./status/AssociatedStatusInfo";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  playerProfiles: Array<PlayerProfileInterface>;
  sortBy: any;
}

const TrainerProfilesTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  playerProfiles,
  sortBy,
}) => {
  const typeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Zawodnik";

      case 2:
        return "Trener";
      default:
        return type;
    }
  };

  const headers = [
    "Imię i nazwisko",
    "Typ profilu",
    "Czy trener zrzeszony",
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
          .sort((a: any, b: any) => compare(a, b, "Name"))
          .reverse();
      case 3:
        return array.slice().sort((a: any, b: any) => compare(a, b, "Name"));
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, playerProfiles);

  const rows = sortedArray.map((player: any) => ({
    data: { link: `/trainer-profiles/detail/${player.Id}` },
    cols: [
      player.Name,
      typeSwitch(player.Type),
      <AssociatedStatusInfo isActive={player.Associated} />,
      <UserStatusInfo
        className="flex gap-x-2 px-8 md: -ml-4 md:pl-2/10 lg:pl-3/10 2xl:pl-4/10"
        isActive={player.IsVerified}
      />,
    ],
  }));

  return (
    <DataTable
      rows={rows}
      headers={headers}
      isDataLoading={loading}
      containerRef={containerRef}
      lastItemRef={lastItemRef}
    />
  );
};

export default TrainerProfilesTable;
