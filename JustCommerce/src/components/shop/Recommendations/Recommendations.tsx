import { useState } from "react";
import { useSelector } from "react-redux";

import RecommendationsTable from "./RecommendationsTable";

import usersService from "../../../services/usersService";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { RootState } from "../../../store/store";
import { DataViewMode } from "../../../types/globalTypes";
import { IUserManagement, UserInterface } from "../../../types/userTypes";

import ContentContainer from "../../layout/ContentContainer";
import FilterPanel from "../../filters/FilterPanel";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "rekomendation",
    values: [
      { backend: "True", pl: "Tak" },
      { backend: "False", pl: "Nie" },
    ],
    pl: "Recomendation",
  },
];

const Recommendations: React.FC = () => {
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment
  );

  const [queryString, setQueryString] = useState("");

  const {
    items: users,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<UserInterface>(usersService.getAll, queryString);

  const handleSearch = (query: string) => {
    setQueryString(query);
  };

  return (
    <ContentContainer title="Rekomendacje">
      <FilterPanel filters={filters} />

      <RecommendationsTable
        users={users}
        containerRef={containerRef}
        lastItemRef={lastItemRef}
        loading={loading}
      />
    </ContentContainer>
  );
};

export default Recommendations;
