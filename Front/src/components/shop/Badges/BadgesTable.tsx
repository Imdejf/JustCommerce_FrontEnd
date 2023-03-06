import { IUserManagement, UserInterface } from "../../../types/userTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  users: Array<UserInterface>;
}

const BadgesTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  users,
}) => {
  const headers = ["Kategorie", "Warunek", "Kolor plakietki", "Priorytet"];

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
      cols: [
        "NOWOŚĆ.",
        "Jeżeli produkt jest dodany <1 m-c",
        "Niebieski",
        "Najwyższy 1.",
      ],
    },
    {
      cols: [
        "Popularny wśród zawodników",
        "Sprzedaż wśród zawodników > 15%",
        "Zielony",
        "2",
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

export default BadgesTable;
