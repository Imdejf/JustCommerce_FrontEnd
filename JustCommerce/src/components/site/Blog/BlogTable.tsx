import { BlogCategoryInterface } from "../../../types/Blog/blogTypes";
import DataTable from "../../common/dataTable/DataTable";

interface IBlogCategoryProps {
    containerRef: any;
    lastItemRef: any;
    categories: Array<BlogCategoryInterface>;
    isDataLoading: boolean;
    sortBy: any;
}

const BlogCategoryTable: React.FC<IBlogCategoryProps> = ({
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
        data: { link: `/site/blog/detail/${category.id}`},
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

  export default BlogCategoryTable;