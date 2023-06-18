import { AttributeGroupInterface } from "../../../types/Attribute/attributeGroupTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IProductAttributeGroupTableProps {
  containerRef: any;
  lastItemRef: any;
  attributeGroups: Array<AttributeGroupInterface>;
  isDataLoading: boolean;
  sortBy: any;
}

const ProductAttributeGroupTable: React.FC<IProductAttributeGroupTableProps> = ({
  containerRef,
  lastItemRef,
  attributeGroups,
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

  const sortedArray = sortingFunction(sortBy?.value, attributeGroups);

  const rows = sortedArray.map((attributeGroup: any) => ({
    data: { link: `/catalog/product-attribute-group/detail/${attributeGroup.id}`},
    cols: [
      attributeGroup.name,
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

export default ProductAttributeGroupTable;
