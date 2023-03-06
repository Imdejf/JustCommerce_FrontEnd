import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DefaultSortContext } from "contexts/defaultSortContext";
import UsersList from "./UsersList";
import PlayerProfilesTable from "./PlayerProfilesTable";

import playerProfileServices from "../../services/playerProfileServices";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { RootState } from "../../store/store";
import { DataViewMode } from "../../types/globalTypes";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
} from "../../types/userTypes";

import ContentContainer from "../layout/ContentContainer";
import FilterPanel from "../filters/FilterPanel";
import PlayerProfilesTopBar from "./PlayerProfilesTopbar";
import { useLocation } from "react-router-dom";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "IsAssociated",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Czy zawodnik zrzeszony",
  },
  {
    id: 1,
    type: "checkbox",
    name: "IsBanned",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Czy zablokowany",
  },
  {
    id: 2,
    type: "checkbox",
    name: "IsActivated",
    values: [
      { backend: "True", pl: "Aktywny" },
      { backend: "False", pl: "Nieaktywny" },
    ],
    pl: "Status",
  },
  {
    id: 3,
    type: "rangeOfAmount",
    name: "Birthdate",
    pl: "Rocznik",
  },
  {
    id: 4,
    type: "rangeOfAmount",
    name: "Region",
    pl: "Województwo",
  },
  {
    id: 5,
    type: "rangeOfAmount",
    name: "PostCode",
    pl: "Kod pocztowy",
  },
];

const PlayerProfiles: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment,
  );

  const [queryString, setQueryString] = useState("");

  const {
    items: playerProfiles,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<PlayerProfileInterface>(
    playerProfileServices.getAllPlayerProfiles,
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

  const handleSearch = (query: string) => {
    setQueryString(query);
  };
  return (
    <ContentContainer
      title="Profile zawodników"
      TopBar={
        <PlayerProfilesTopBar
          sorts={sorts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleQueryChange={handleSearch}
          defaultSort={defaultSort}
        />
      }
    >
      <FilterPanel filters={filters} />

      {viewMode === DataViewMode.table ? (
        <PlayerProfilesTable
          playerProfiles={playerProfiles}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
      ) : (
        <UsersList
          playerProfiles={playerProfiles}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
        />
      )}
    </ContentContainer>
  );
};

export default PlayerProfiles;
