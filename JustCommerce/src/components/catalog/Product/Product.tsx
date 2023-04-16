import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import ProductTable from "./ProductTable";

import { DefaultSortContext } from "contexts/defaultSortContext";
import ProductTopBar from "./ProductTopBar";
import productServices from "../../../services/Product/productServices"
import { IProduct, ProductListItemDTO } from "types/Product/product";

const Product: React.FC = () => {
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
        items: products,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<ProductListItemDTO>(
        productServices.getAll, 
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
        <ContentContainer title="Product">
            <ProductTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <ProductTable
            products={products}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer>
    )
};

export default Product;