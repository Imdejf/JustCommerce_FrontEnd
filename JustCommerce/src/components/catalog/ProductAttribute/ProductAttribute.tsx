import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import AttributeTable from "./ProductAttributeTable";

import { DefaultSortContext } from "contexts/defaultSortContext";
import ProductAttributeTopBar from "./ProductAttributeTopBar";
import {AttributeInterface} from "../../../types/Attribute/attributeTypes"
import attributeServices from "../../../services/Attribute/attributeServices"

const ProductAttribute: React.FC = () => {
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
        items: productAttributes,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<AttributeInterface>(
        attributeServices.getAll, 
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
        <ContentContainer title="Attribute">
            <ProductAttributeTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <AttributeTable
            attributes={productAttributes}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer>
    )
};

export default ProductAttribute;