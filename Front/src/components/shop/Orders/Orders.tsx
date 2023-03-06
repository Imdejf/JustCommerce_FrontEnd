import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import UsersList from "./UsersList";
import PlayerProfilesTable from "./OrdersTable";

import playerProfileServices from "../../../services/playerProfileServices";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { RootState } from "../../../store/store";
import { DataViewMode } from "../../../types/globalTypes";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileInterface,
  OrderInterface,
} from "../../../types/userTypes";

import ContentContainer from "../../layout/ContentContainer";
import FilterPanel from "../../filters/FilterPanel";
import PlayerProfilesTopBar from "./OrdersTopBar";
import OrdersTopbar from "./OrdersTopBar";
import OrdersTable from "./OrdersTable";
import orderServices from "services/orderServices";
import { useParams } from "react-router-dom";
import { showServerErrors } from "utils/errorsUtils";
import { DefaultSortContext } from "contexts/defaultSortContext";

const filters = [
  {
    id: 0,
    type: "date",
    name: "From",
    pl: "Data od",
  },
  {
    id: 1,
    type: "date",
    name: "To",
    pl: "Data do",
  },
  {
    id: 2,
    type: "select",
    name: "OrderState",
    values: [
      { backend: 1, pl: "Zapłacony" },
      { backend: 2, pl: "Oczekuje na zapłate" },
      { backend: 3, pl: "Otwarty" },
      { backend: 4, pl: "Przetwarzany" },
      { backend: 5, pl: "Anulowany" },
      { backend: 6, pl: "Wstrzymany" },
      { backend: 7, pl: "Gotowy do wysłania" },
      { backend: 8, pl: "Wysłany" },
      { backend: 9, pl: "Dostarczony" },
      { backend: 10, pl: "Zakończony" },
    ],
    pl: "Status",
  },
  {
    id: 2,
    type: "select",
    name: "Payment",
    values: [
      { backend: 0, pl: "Przelew24" },
      { backend: 1, pl: "CashOnDelivery" },
    ],
    pl: "Płatność",
  },
  {
    id: 3,
    type: "rangeOfAmount",
    name: "AmountFrom",
    pl: "Wartość od",
  },
  {
    id: 4,
    type: "rangeOfAmount",
    name: "AmountTo",
    pl: "Wartość do",
  },
  {
    id: 4,
    type: "rangeOfAmount",
    name: "Delivery",
    pl: "Dostawa",
  },
];

const Orders: React.FC = () => {
  const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);
  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);
  const viewMode = useSelector(
    (state: RootState) => state.ui.dataViewModes.usersManagment,
  );

  const [queryString, setQueryString] = useState("");

  const {
    items: orders,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<OrderInterface>(
    orderServices.getAllOrders,
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
          label: "Wartość - rosnąco",
          value: 2,
        },
        {
          label: "Wartość - malejąco",
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

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    orderServices
      //@ts-ignore
      .getAllOrders(id)
      .then((item) => {
        console.log(item);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, []);

  const handleSearch = (query: string) => {
    setQueryString(query);
  };

  return (
    <ContentContainer
      title="Zamówienia"
      TopBar={
        <OrdersTopbar
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
        <OrdersTable
          orders={orders}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
      ) : (
        <OrdersTable
          orders={orders}
          containerRef={containerRef}
          lastItemRef={lastItemRef}
          loading={loading}
          sortBy={sortBy}
        />
        // <UsersList
        //   playerProfiles={playerProfiles}
        //   containerRef={containerRef}
        //   lastItemRef={lastItemRef}
        // />
      )}
    </ContentContainer>
  );
};

export default Orders;
