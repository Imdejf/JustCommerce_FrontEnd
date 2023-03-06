import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import CategoryTable from "./CategoryTable";

import { DefaultSortContext } from "contexts/defaultSortContext";
import CategoryTopBar from "./CategoryTopBar";
import {CategoryInterface} from "../../../types/Category/categoryTypes"
import categoryServices from "../../../services/Category/categoryServices"

const Category: React.FC = () => {
    const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
    const [sortBy, setSortBy] =
      useState<{ value: number; label: string } | null>(null);
    const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
    const viewMode = useSelector(
      (state: RootState) => state.ui.dataViewModes.artists,
    );
    const [queryString, setQueryString] = useState("");
    const { currentUser } = useSelector((state: RootState) => state);

    const {
        items: categories,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<CategoryInterface>(
        categoryServices.getAll, 
        queryString,
        undefined,
        undefined, 
        currentUser?.storeId);

    const [items, setItems] = useState([]);
    useEffect(() => {
        if (sortBy) {
          // @ts-ignore
          setDefaultSort(sortBy.value);
        }
    }, [sortBy]);

    const handleSearch = (query: string) => {
        setQueryString(query);
    };

    return(
        <ContentContainer title="Category">
            <CategoryTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <CategoryTable
            categories={categories}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer>
    )
};

export default Category;