import { IUserManagement, UserInterface } from "../../types/userTypes";
import DataTable from "../common/dataTable/DataTable";
import UserStatusInfo from "./status/UserStatusInfo";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  users: Array<UserInterface>;
  sortBy: any;
}

const UsersTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  users,
  sortBy,
}) => {
  const headers = [
    "Imię",
    "Nazwisko",
    "Email",
    "Stanowisko",
    "Numer telefonu",
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
          .sort((a: any, b: any) => compare(a, b, "FirstName"))
          .reverse();
      case 3:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "FirstName"));
      case 4:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "LastName"))
          .reverse();
      case 5:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "LastName"));
      case 6:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "Email"))
          .reverse();
      case 7:
        return array.slice().sort((a: any, b: any) => compare(a, b, "Email"));
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, users);

  const rows = sortedArray.map((user: any) => ({
    data: { link: `/users/detail/${user.UserId}` },
    cols: [
      user.FirstName,
      user.LastName,
      user.Email,
      user.Position,
      user.PhoneNumber,
      <UserStatusInfo
        className="flex gap-x-2 px-8 md: -ml-4 md:pl-2/10 lg:pl-3/10 2xl:pl-4/10"
        isActive={user.IsActivate}
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

export default UsersTable;
