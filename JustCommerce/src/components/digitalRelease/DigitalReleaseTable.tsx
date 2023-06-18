import { useTranslation } from "react-i18next";

import DataTable from "components/common/dataTable/DataTable";
import StatusInfo from "components/statusInfo/StatusInfo";

import {
  IDigitalRelease,
  MusicProductStatus,
  Product,
} from "types/digitalReleaseTypes";
import UserStatusInfo from "components/shop/Orders/status/UserStatusInfo";
import AssociatedStatusInfo from "components/playerProfiles/status/AssociatedStatusInfo";

interface IDigitalReleaseTableProps {
  products: Array<Product>;
  containerRef: any;
  lastItemRef: any;
  isDataLoading: boolean;
  sortBy: any;
}

const DigitalReleaseTable: React.FC<IDigitalReleaseTableProps> = ({
  products,
  containerRef,
  isDataLoading,
  lastItemRef,
  sortBy,
}) => {
  const { t } = useTranslation();
  const headers = [
    "Nazwa",
    "Kategoria",
    "Typ produktu",
    "EAN",
    "Zapas",
    "Dostawca",
    "Dostępny",
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

  const typeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "produkt";
      case 2:
        return "usługa";
      case 3:
        return "licencja";
      default:
        return type;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, products);

  const rows = sortedArray.map((product: any) => ({
    data: { link: `/shop/products/detail/${product.ProductId}` },
    cols: [
      product.Name,
      product.CategoryName,
      typeSwitch(product.Type),
      product.EAN,
      product.TotalAmount,
      "JUSTWIN",
      <AssociatedStatusInfo isActive={product.IsAvailable} />,
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

export default DigitalReleaseTable;
