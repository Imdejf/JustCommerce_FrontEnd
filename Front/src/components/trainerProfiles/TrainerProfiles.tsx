import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import PlayerProfilesTable from "./TrainerProfilesTable";

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
import PlayerProfilesTopBar from "./TrainerProfilesTopbar";
import trainerProfileServices from "services/trainerProfileServices";
import TrainerProfilesTable from "./TrainerProfilesTable";
import TrainerProfilesTopBar from "./TrainerProfilesTopbar";
import { DefaultSortContext } from "contexts/defaultSortContext";

const filters = [
  {
    // no endpoint
    id: 0,
    type: "checkbox",
    name: "Trener",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Trener",
  },
];

const TrainerProfiles: React.FC = () => {
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment,
  );

  const [queryString, setQueryString] = useState("");
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

  const {
    items: playerProfiles,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<PlayerProfileInterface>(
    trainerProfileServices.getAllTrainerProfiles,
    queryString,
  );
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
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

  const handleSearch = (query: string) => {
    setQueryString(query);
  };

  useEffect(() => {
    if (sortBy) {
      // @ts-ignore
      setDefaultSort(sortBy.value);
    }
  }, [sortBy]);

  return (
    <ContentContainer
      title="Profile trenerów"
      TopBar={
        <TrainerProfilesTopBar
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
        <TrainerProfilesTable
          sortBy={sortBy}
          playerProfiles={playerProfiles}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
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

export default TrainerProfiles;
