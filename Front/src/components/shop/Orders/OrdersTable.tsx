import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
  OrderInterface,
} from "../../../types/userTypes";
import DataTable from "../../common/dataTable/DataTable";
import UserStatusInfo from "./status/UserStatusInfo";
import HoldIco from "../../../assets/icons/status/hold.svg";
import VerifiedIco from "../../../assets/icons/status/verified.svg";
import AssociatedStatusInfo from "./status/AssociatedStatusInfo";

interface IUsersTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  orders: Array<OrderInterface>;
  sortBy: any;
}

const OrdersTable: React.FC<IUsersTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  orders,
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

  const paymentSwitch = (type: number) => {
    switch (type) {
      case 0:
        return "Przelew24";

      case 1:
        return "CashOnDelivery";
      default:
        return type;
    }
  };

  const statusSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Opłacony";

      case 2:
        return "Oczekuje na zapłate";

      case 3:
        return "Otwarty";

      case 4:
        return "Przetwarzany";

      case 5:
        return "Anulowany";

      case 6:
        return "Wstrzymany";

      case 7:
        return "Gotowy do wysłania";

      case 8:
        return "W drodze";

      case 9:
        return "Dostarczony";

      case 10:
        return "Zakończony";

      default:
        return type;
    }
  };

  const headers = [
    "Nr zamówienia",
    "Klient",
    "Data zamówienia",
    "Wartość",
    "Płatność",
    "Dostawa",
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
          .sort((a: any, b: any) => compare(a, b, "TotalTax"))
          .reverse();
      case 3:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "TotalTax"));
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, orders);
  const rows = sortedArray.map((order: OrderInterface) => {
    return {
      data: { link: `/shop/orders/detail/${order.Id}` },
      cols: [
        `${order.Numer ?? "-"}`,
        `${order.User.FirstName} ${order.User.LastName}`,
        `${order.Created.slice(0, 10)}`,
        `${new Intl.NumberFormat("fr-CA", { minimumFractionDigits: 2 }).format(
          order.TotalTax,
        )}`,
        `${paymentSwitch(order.Payment)}`,
        `${order.DeliveryName}`,
        `${statusSwitch(
          order.DeliveryHistories[order.DeliveryHistories.length - 1].State,
        )}`,
      ],
    };
  });

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

export default OrdersTable;
