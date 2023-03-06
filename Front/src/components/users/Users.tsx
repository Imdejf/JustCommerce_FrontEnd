import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import UsersTable from "./UsersTable";

import usersService from "../../services/usersService";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { RootState } from "../../store/store";
import { DataViewMode } from "../../types/globalTypes";
import { IUserManagement, UserInterface } from "../../types/userTypes";

import ContentContainer from "../layout/ContentContainer";
import FilterPanel from "../filters/FilterPanel";
import UsersTopbar from "./UsersTopbar";
import { DefaultSortContext } from "contexts/defaultSortContext";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "IsActivated",
    values: [
      { backend: "True", pl: "Aktywny" },
      { backend: "False", pl: "Nieaktywny" },
    ],
    pl: "Status",
  },
];

const Users: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment,
  );

  const [queryString, setQueryString] = useState("");

  const {
    items: users,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<UserInterface>(usersService.getAll, queryString);

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
          label: "Imię (A-Z)",
          value: 2,
        },
        {
          label: "Imię (Z-A)",
          value: 3,
        },
        {
          label: "Nazwisko (A-Z)",
          value: 4,
        },
        {
          label: "Nazwisko (Z-A)",
          value: 5,
        },
        {
          label: "Email (A-Z)",
          value: 6,
        },
        {
          label: "Email (Z-A)",
          value: 7,
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
      title="Lista pracowników"
      TopBar={
        <UsersTopbar
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
        <UsersTable
          users={users}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
      ) : (
        <UsersList
          users={users}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
        />
      )}
    </ContentContainer>
  );
};

export default Users;
