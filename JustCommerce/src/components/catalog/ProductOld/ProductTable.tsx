import { IProduct } from "types/Product/product";
import DataTable from "../../common/dataTable/DataTable";

interface IAtributeTableProps {
    containerRef: any;
    lastItemRef: any;
    products: Array<IProduct>;
    isDataLoading: boolean;
    sortBy: any;
}

const ProductTable: React.FC<IAtributeTableProps> = ({
    containerRef,
    lastItemRef,
    products,
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

    const sortedArray = sortingFunction(sortBy?.value, products);

    const rows = sortedArray.map((product: any) => ({
        data: { link: `/catalog/product/detail/${product.id}`},
        cols: [
            product.name,
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

export default ProductTable