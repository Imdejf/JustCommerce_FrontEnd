// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import DataTable from "../../../../common/dataTable/DataTable";
import { IBlogItemInterface } from "types/BlogItem/blogItemTypes";
import BlogCategoryDetailTableTopBar from "./BlogCategoryDetailTableTopBar";
import ContentContainer from "components/layout/ContentContainer";

interface BlogCategoryDetailTableProps {
    containerRef: any;
    lastItemRef: any;
    blogItems: Array<IBlogItemInterface>;
    isDataLoading: boolean;
    sortBy: any;
}

const BlogCategoryDetailTable: React.FC<BlogCategoryDetailTableProps> = ({
    containerRef,
    lastItemRef,
    blogItems,
    isDataLoading,
    sortBy,
    }) => { 
    const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

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

    const handleSearch = (query: string) => {
      setQueryString(query);
  };

    const sortedArray = sortingFunction(sortBy?.value, blogItems);

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

export default BlogCategoryDetailTable