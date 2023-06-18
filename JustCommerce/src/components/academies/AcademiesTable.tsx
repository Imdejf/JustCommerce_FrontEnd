import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
  AcademyInterface,
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
  academies: Array<AcademyInterface>;
  sortBy: any;
}

const AcademiesTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  academies,
  sortBy,
}) => {
  const typeSwitch = (type: number) => {
    switch (type) {
      case 0:
        return "akademia";

      case 1:
        return "klub";

      case 2:
        return "reprezentacja";

      default:
        return type;
    }
  };

  const headers = [
    "Nazwa akademii",
    "Lokalizacja",
    "Typ",
    "Status 2",
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
      case 4:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "City"))
          .reverse();
      case 5:
        return array.slice().sort((a: any, b: any) => compare(a, b, "City"));
      case 6:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "Type"))
          .reverse();
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, academies);

  const rows = sortedArray.map((academy: any) => ({
    data: { link: `/academies/detail/${academy.Id}` },
    cols: [
      academy.Name,
      academy.City,
      typeSwitch(academy.Type),
      <AssociatedStatusInfo isActive={academy.IsVerified} />,
      <AssociatedStatusInfo isActive={academy.IsVerified} />,
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

export default AcademiesTable;
