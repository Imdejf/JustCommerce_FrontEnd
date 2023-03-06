import { CategoryInterface } from "../../../types/Category/categoryTypes";
import DataTable from "../../common/dataTable/DataTable";

interface ICategoryProps {
    containerRef: any;
    lastItemRef: any;
    categories: Array<CategoryInterface>;
    isDataLoading: boolean;
    sortBy: any;
}

const CategoryTable: React.FC<ICategoryProps> = ({
    containerRef,
    lastItemRef,
    categories,
    isDataLoading,
    sortBy,
  }) => {
    const headers = ["Nazwa","Kategoria nadrzędna","Kolejność wyświetlania"];

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

    const sortedArray = sortingFunction(sortBy?.value, categories);

    const rows = sortedArray.map((category: any) => ({
        data: { link: `/catalog/category/detail/${category.id}`},
        cols: [
            category.name,
            category?.parentCategory?.Name,
            category.displayOrder
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

export default CategoryTable