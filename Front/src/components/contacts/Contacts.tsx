import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ContactsList from "./ContactsList";
import ContactsTable from "./ContactsTable";
import ContentContainer from "../layout/ContentContainer";
import ContactsTopbar from "./ContactsTopbar";

import contactServices from "../../services/contactServices";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { DataViewMode } from "../../types/globalTypes";
import { IUser, UserInterface } from "../../types/userTypes";
import { DefaultSortContext } from "contexts/defaultSortContext";

const Contacts: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.contacts,
  );
  const [queryString, setQueryString] = useState("");

  const {
    items: contacts,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<UserInterface>(contactServices.getAll, queryString);

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
      title="Lista kontaktów"
      TopBar={
        <ContactsTopbar
          sorts={sorts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleQueryChange={handleSearch}
          defaultSort={defaultSort}
        />
      }
    >
      {viewMode === DataViewMode.table ? (
        <ContactsTable
          contacts={contacts}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          isDataLoading={loading}
          sortBy={sortBy}
        />
      ) : (
        <ContactsList
          contacts={contacts}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
        />
      )}

      <div>{loading && "Loading..."} </div>
    </ContentContainer>
  );
};

export default Contacts;
