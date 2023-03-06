import { AttributeInterface } from "../../../types/Attribute/attributeTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IAtributeTableProps {
    containerRef: any;
    lastItemRef: any;
    attributes: Array<AttributeInterface>;
    isDataLoading: boolean;
    sortBy: any;
}

const ProductAttributeTable: React.FC<IAtributeTableProps> = ({
    containerRef,
    lastItemRef,
    attributes,
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

    const sortedArray = sortingFunction(sortBy?.value, attributes);

    const rows = sortedArray.map((attribute: any) => ({
        data: { link: `/catalog/product-attribute/detail/${attribute.id}`},
        cols: [
            attribute.name,
        ],
    }));

    return (
        <DataTable
        rows={rows}
        headers={headers}
        isDataLoading={isDataLoading}
        containerRef={containerRef}
        lastItemRef={lastItemRef}/>
    )
}

export default ProductAttributeTable