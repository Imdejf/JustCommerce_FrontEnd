import { useState } from "react";
import { useSelector } from "react-redux";

import DeliveryTable from "./DeliveryTable";

import usersService from "../../../services/usersService";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { RootState } from "../../../store/store";
import { DataViewMode } from "../../../types/globalTypes";
import { IUserManagement, UserInterface } from "../../../types/userTypes";
import productServices from "services/productServices";
import ContentContainer from "../../layout/ContentContainer";
import FilterPanel from "../../filters/FilterPanel";

const filters = [
  {
    id: 0,
    type: "checkbox",
    name: "productType",
    values: [
      { backend: "1", pl: "cos1" },
      { backend: "2", pl: "cos2" },
      { backend: "3", pl: "cos3" },
    ],
    pl: "Typ productu Delivery",
  },
];

const Delivery: React.FC = () => {
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment
  );

  const [queryString, setQueryString] = useState("");

  const {
    items: delivery,
    loading,
    containerRef,
    lastItemRef,
    // @ts-ignore
  } = useInfiniteScroll(productServices.getAllDelivery, queryString);

  const handleSearch = (query: string) => {
    setQueryString(query);
  };

  return (
    <ContentContainer title="Dostawy">
      <FilterPanel filters={filters} />

      <DeliveryTable
        // @ts-ignore
        delivery={delivery}
        containerRef={containerRef}
        lastItemRef={lastItemRef}
        loading={loading}
      />
    </ContentContainer>
  );
};

export default Delivery;
