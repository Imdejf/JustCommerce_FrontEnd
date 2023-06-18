import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import ProductOptionTable from "./ProductOptionTable";

import { DefaultSortContext } from "contexts/defaultSortContext";
import ProductOptionTopBar from "./ProductOptionTopBar";
import productOptionServices from "../../../services/ProductOption/productOptionServices"
import { ProductOptionInterface } from "types/ProductOption/productOptionTypes";

const ProductOption: React.FC = () => {
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
        items: productOptions,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<ProductOptionInterface>(
        productOptionServices.getAll, 
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
            <ContentContainer title="Opcje produktu">
                <ProductOptionTopBar
                sorts={sorts}
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleQueryChange={handleSearch}
                defaultSort={defaultSort}
                />
                <ProductOptionTable
                productOptions={productOptions}
                containerRef={containerRef}
                lastItemRef={lastItemRef}
                isDataLoading={loading}
                sortBy={sortBy}
                />
            </ContentContainer>
        )
}

export default ProductOption;
