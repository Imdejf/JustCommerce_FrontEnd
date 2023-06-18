import { IUser, UserInterface } from "../../types/userTypes";
import DataTable from "../common/dataTable/DataTable";

interface IContactsTableProps {
  containerRef: any;
  lastItemRef: any;
  contacts: Array<UserInterface>;
  isDataLoading: boolean;
  sortBy: any;
}

const ContactsTable: React.FC<IContactsTableProps> = ({
  containerRef,
  lastItemRef,
  contacts,
  isDataLoading,
  sortBy,
}) => {
  const headers = ["Imię", "Nazwisko", "Email", "Stanowisko", "Numer telefonu"];

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

  const sortedArray = sortingFunction(sortBy?.value, contacts);

  const rows = sortedArray.map((contact: any) => ({
    data: {},
    cols: [
      contact.FirstName,
      contact.LastName,
      contact.Email,
      contact.Position,
      contact.PhoneNumber,
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

export default ContactsTable;
