import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import ArtistsList from "./ArtistsList";
import ArtistTable from "./table/ArtistTable";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import artistsService from "../../services/artistServices";
import { RootState } from "../../store/store";
import { IArtist, ArtistInterface } from "../../types/artistTypes";
import { DataViewMode } from "../../types/globalTypes";
import FilterPanel from "../filters/FilterPanel";
import ContentContainer from "../layout/ContentContainer";
import ArtistTopbar from "./ArtistTopbar";
import { DefaultSortContext } from "contexts/defaultSortContext";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "AreTherePlayerProfile",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Profil Zawodnika",
  },
  {
    id: 1,
    type: "checkbox",
    name: "AreThereTrainerProfile",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Profil Trenera",
  },
  {
    id: 2,
    type: "checkbox",
    name: "IsActivated",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Status",
  },
];

const Artists: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.artists,
  );
  const [queryString, setQueryString] = useState("");
  const {
    items: artists,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<ArtistInterface>(artistsService.getAll, queryString);

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
          label: "Email (A-Z)",
          value: 2,
        },
        {
          label: "Email (Z-A)",
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
      title="Konta użytkowników"
      TopBar={
        <ArtistTopbar
          sorts={sorts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleQueryChange={handleQueryChange}
          defaultSort={defaultSort}
        />
      }
    >
      <>
        <FilterPanel filters={filters} />
        {viewMode === DataViewMode.table ? (
          <ArtistTable
            artists={artists}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
            sortBy={sortBy}
          />
        ) : (
          <ArtistsList
            artists={artists}
            containerRef={containerRef}
            lastItemRef={lastItemRef}
            isDataLoading={loading}
          />
        )}
      </>
    </ContentContainer>
  );
};

export default Artists;
