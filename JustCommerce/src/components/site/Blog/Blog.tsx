import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import BlogTopBar from "./BlogTopBar";

import { DefaultSortContext } from "contexts/defaultSortContext";
import { BlogCategoryInterface } from "../../../types/Blog/blogTypes";

import blogServices from "services/Blog/blogServices";
import BlogTable from "./BlogTable"

const Blog: React.FC = () => {
    const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
    const [sortBy, setSortBy] =
      useState<{ value: number; label: string } | null>(null);
    const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

    const [queryString, setQueryString] = useState("");
    const { currentUser } = useSelector((state: RootState) => state);

    const handleSearch = (query: string) => {
        setQueryString(query);
    };

    const {
        items: categories,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<BlogCategoryInterface>(
        blogServices.getAll, 
        queryString,
        undefined,
        undefined, 
        currentUser?.storeId);

    return (
        <ContentContainer title="Blog">
            <BlogTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <BlogTable
            categories={categories}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer> 
   )
}

export default Blog;
