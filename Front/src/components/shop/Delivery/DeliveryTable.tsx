import {
  IUserManagement,
  UserInterface,
  DeliveryInterface,
} from "../../../types/userTypes";
import DataTable from "./dataTable/DataTable";
import Logo from "../../../assets/images/logo.svg";

interface IDeliveryTableProps {
  loading: boolean;
  containerRef: any;
  lastItemRef: any;
  delivery: Array<DeliveryInterface>;
}

const DeliveryTable: React.FC<IDeliveryTableProps> = ({
  loading,
  containerRef,
  lastItemRef,
  delivery,
}) => {
  const headers = [
    "Logo",
    "Nazwa",
    "Opis",
    "Termin",
    "Kwota Brutto",
    "VAT",
    "Netto",
    "Obszar",
    "od wart. Zamówienia",
  ];

  const areaSwitch = (data: number) => {
    switch (data) {
      case 1:
        return "cały świat";
      case 2:
        return "Polska";
      default:
        return data;
    }
  };

  const rows = delivery.map((delivery) => ({
    // data: { link: `/deliverys/detail/${delivery.Id}` },
    cols: [
      // @ts-ignore
      <img
        src={delivery.FtpPhotoFilePath ? delivery.FtpPhotoFilePath : Logo}
        alt=""
      />,
      delivery.Name,
      delivery.Description,
      delivery.Deadline ? delivery.Deadline + "H" : "natychmiast",
      delivery.Gross,
      delivery.Tax,
      delivery.Netto,
      areaSwitch(delivery.AreaOfActivity),
      delivery.OnPrice,
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

export default DeliveryTable;
