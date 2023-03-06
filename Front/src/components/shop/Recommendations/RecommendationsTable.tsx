import { IUserManagement, UserInterface } from "../../../types/userTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  users: Array<UserInterface>;
}

const RecommendationsTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  users,
}) => {
  const headers = ["Nazwa", "Warunek"];

  // const rows = users.map((user) => ({
  //   data: { link: `/users/detail/${user.UserId}` },
  //   cols: [
  //     user.FirstName,
  //     user.LastName,
  //     user.Email,
  //     user.Position,
  //     user.PhoneNumber,
  //   ],
  // }));

  const rows = [
    {
      cols: ["Dla nowych zawodników", "Profil zawodnika <30 dni"],
    },
    {
      cols: [
        "Ci co nie mają jeszcze urządzenia",
        "Brak podpiętego aktywnego urządzenia w profilu zawodnika",
      ],
    },
  ];

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

export default RecommendationsTable;
