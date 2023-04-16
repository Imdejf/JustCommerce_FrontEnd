import { IProduct, ProductListItemDTO } from "types/Product/product";
import DataTable from "../../common/dataTable/DataTable";
import AssociatedStatusInfo from "components/playerProfiles/status/AssociatedStatusInfo";

interface IProductTableProps {
    containerRef: any;
    lastItemRef: any;
    products: Array<ProductListItemDTO>;
    isDataLoading: boolean;
    sortBy: any;
}

const ProductTable: React.FC<IProductTableProps> = ({
    containerRef,
    lastItemRef,
    products,
    isDataLoading,
    sortBy,
  }) => {
    const headers = ["Nazwa", "Opcje produktu", "Widoczny", "Zapytaj o cenę", "Data stworzenia"];

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
      console.log("HERRERA");
      
      console.log(array)
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
            <AssociatedStatusInfo isActive={product.hasOption}/>,
            <AssociatedStatusInfo isActive={product.isPublished}/>,
            <AssociatedStatusInfo isActive={product.isCallForPricing}/>,
            new Date(product.createdOn).toISOString().slice(0, 10).split('-').reverse().join('-')
        ],
    }));

    return (
      <div>
        <DataTable
        rows={rows}
        headers={headers}
        isDataLoading={isDataLoading}
        containerRef={containerRef}
        lastItemRef={lastItemRef}/>
      </div>
    )
}

export default ProductTable