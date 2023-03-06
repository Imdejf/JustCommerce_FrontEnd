import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";


import ContentContainer from "components/layout/ContentContainer";
import AttributeGroupTable from "./ProductAttributeGroupTable";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

import { AttributeGroupInterface } from "../../../types/Attribute/attributeGroupTypes"
import productAttributeGroupServices from "../../../services/Attribute/attributeGroupServices"
import { IListPageResponse } from "types/globalTypes";
import { DefaultSortContext } from "contexts/defaultSortContext";
import ProductAttributeGroupTopBar from "./ProductAttributeGroupTopBar";


const AttributeGroup: React.FC = () => {

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
        items: attributeGroups,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<AttributeGroupInterface>(
      productAttributeGroupServices.getAll, 
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
        <ContentContainer title="Attribute Groups">
          <ProductAttributeGroupTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <AttributeGroupTable
            attributeGroups={attributeGroups}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
            />
        </ContentContainer>
        </div>
    )
}

export default AttributeGroup;
