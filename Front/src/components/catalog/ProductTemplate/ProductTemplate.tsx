import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";


import ContentContainer from "components/layout/ContentContainer";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

import { ProductTemplateInterface } from "../../../types/ProductTemplate/productTemplateTypes"
import productTemplateServices from "../../../services/ProductTemplate/productTemplateServices"
import { IListPageResponse } from "types/globalTypes";
import { DefaultSortContext } from "contexts/defaultSortContext";
import ProductTemplateTopBar from "./ProductTemplateTopBar";
import ProductTemplateTable from "./ProductTemplateTable";

const ProductTemplate: React.FC = () => {

    const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
    const [sortBy, setSortBy] =
      useState<{ value: number; label: string } | null>(null);
    const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
    const viewMode = useSelector(
      (state: RootState) => state.ui.dataViewModes.artists,
    );
    const [queryString, setQueryString] = useState("");
    const { auth, currentUser } = useSelector((state: RootState) => state);

    const {
        items: productTemplates,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<ProductTemplateInterface>(
    productTemplateServices.getAll, 
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
        <div>
        <ContentContainer title="Product Template">
          <ProductTemplateTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <ProductTemplateTable
            productTemplates={productTemplates}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer>
        </div>
    )
}

export default ProductTemplate;
