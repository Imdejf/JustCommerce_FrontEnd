import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

import ContentContainer from "components/layout/ContentContainer";
import FilterPanel from "components/filters/FilterPanel";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import { DataViewMode } from "types/globalTypes";
import { IDigitalRelease, Product } from "types/digitalReleaseTypes";

import DigitalReleasesList from "./tiles/DigitalReleaseList";
import DigitalReleaseTable from "./DigitalReleaseTable";
import DigitalReleaseTopbar from "./DigitalReleaseTopbar";
import { useTranslation } from "react-i18next";
import usersService from "services/usersService";
import productServices from "services/productServices";
import { DefaultSortContext } from "contexts/defaultSortContext";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "Type",
    values: [
      { backend: "1", pl: "produkt" },
      { backend: "2", pl: "usługa" },
      { backend: "3", pl: "subskrypcja" },
    ],
    pl: "Typ productu",
  },
  {
    id: 1,
    type: "checkbox",
    name: "IsAvailable",
    values: [
      { backend: "1", pl: "Tak" },
      { backend: "2", pl: "Nie" },
    ],
    pl: "Dostępny",
  },
];

const DigitalReleases: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const { t } = useTranslation();
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.digitalRelease,
  );
  const [queryString, setQueryString] = useState("");
  const {
    items: products,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<Product>(
    // @ts-ignore
    productServices.getAllProducts,
    queryString,
  );

  const getAllSorts = async () => {
    try {
      setSorts([
        {
          label: "Najnowsze",
          value: 0,
        },
        {
          label: "Najstarsze",
          value: 1,
        },
        {
          label: "Nazwa (A-Z)",
          value: 2,
        },
        {
          label: "Nazwa (Z-A)",
          value: 3,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSorts();
  }, []);

  useEffect(() => {
    if (sortBy) {
      // @ts-ignore
      setDefaultSort(sortBy.value);
    }
  }, [sortBy]);

  const handleQueryChange = (value: string) => {
    setQueryString(value);
  };

  return (
    <ContentContainer
      title={t("digitalRelease.title.list")}
      TopBar={
        <DigitalReleaseTopbar
          sorts={sorts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleQueryChange={handleQueryChange}
          defaultSort={defaultSort}
        />
      }
    >
      <FilterPanel filters={filters} />

      {viewMode === DataViewMode.table ? (
        <DigitalReleaseTable
          products={products}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          isDataLoading={loading}
          sortBy={sortBy}
        />
      ) : (
        <DigitalReleasesList
          products={products}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          isDataLoading={loading}
        />
      )}
    </ContentContainer>
  );
};

export default DigitalReleases;
