import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import UsersList from "./AcademiesList";
import PlayerProfilesTable from "./AcademiesTable";

import playerProfileServices from "../../services/playerProfileServices";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { RootState } from "../../store/store";
import { DataViewMode } from "../../types/globalTypes";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
  AcademyInterface,
} from "../../types/userTypes";

import ContentContainer from "../layout/ContentContainer";
import FilterPanel from "../filters/FilterPanel";
import PlayerProfilesTopBar from "./AcademiesTopBar";
import AcademiesTable from "./AcademiesTable";
import AcademiesList from "./AcademiesList";
import academiesServices from "services/academiesServices";
import { showServerErrors } from "utils/errorsUtils";
import { DefaultSortContext } from "contexts/defaultSortContext";

const Academies: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment,
  );

  const [queryString, setQueryString] = useState("");

  const [country, setCountry] = useState([]);

  const {
    items: academies,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<AcademyInterface>(
    academiesServices.getAllAcademies,
    queryString,
  );

  useEffect(() => {
    playerProfileServices
      .getAllCountries()
      .then((country) => {
        //@ts-ignore
        const newArr = country.map(
          //@ts-ignore
          ({ FlagValue: backend, FullName: pl, ...prev }) => ({
            backend,
            pl,
            ...prev,
          }),
        );
        //@ts-ignore
        setCountry(newArr);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, []);

  const filters = [
    {
      id: 0,
      type: "checkbox",
      name: "type",
      values: [
        { backend: "0", pl: "Akademia" },
        { backend: "1", pl: "Klub" },
        { backend: "2", pl: "Reprezentacja" },
      ],
      pl: "Typ",
    },
    {
      id: 1,
      type: "select",
      name: "country",
      values: country,
      pl: "Kraj",
    },
  ];

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
        {
          label: "Lokalizacja (A-Z)",
          value: 4,
        },
        {
          label: "Lokalizacja (Z-A)",
          value: 5,
        },
        {
          label: "Typ",
          value: 6,
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
      title="Akademie"
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
        <AcademiesTable
          academies={academies}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
      ) : (
        <AcademiesList
          academies={academies}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
        />
      )}
    </ContentContainer>
  );
};

export default Academies;
