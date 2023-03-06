import { AttributeGroupInterface } from "../../../types/Attribute/attributeGroupTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IProductTemplateTableProps {
  containerRef: any;
  lastItemRef: any;
  productTemplates: Array<AttributeGroupInterface>;
  isDataLoading: boolean;
  sortBy: any;
}

const ProductTemplateTable: React.FC<IProductTemplateTableProps> = ({
  containerRef,
  lastItemRef,
  productTemplates,
  isDataLoading,
  sortBy,
}) => {
  const headers = ["Nazwa"];

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
      default:
        return array;
    }
  };

  const sortedArray = sortingFunction(sortBy?.value, productTemplates);

  const rows = sortedArray.map((productTemplates: any) => ({
    data: { link: `/catalog/product-template/detail/${productTemplates.id}`},
    cols: [
        productTemplates.name,
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

export default ProductTemplateTable;
