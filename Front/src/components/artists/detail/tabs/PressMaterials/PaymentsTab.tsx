import { Product, AttributeValue, Attribute } from "types/digitalReleaseTypes";
import { useState, useEffect } from "react";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import { toast } from "react-toastify";
import TabContent from "components/common/tabs/TabContent";
import usersService from "services/usersService";
import { showServerErrors } from "utils/errorsUtils";
import { useHistory, useParams } from "react-router-dom";
import artistsService from "services/artistServices";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";
import InputSearch from "components/common/inputs/searchInput/InputSearch";
import FilterButton from "components/common/buttons/filterButton/FilterButton";
import FilterPanel from "components/filters/FilterPanel";
import useInfiniteScroll from "hooks/useInfiniteScroll";

const PaymentsTab = () => {
  const filters = [
    {
      id: 0,
      type: "select",
      name: "OrderState",
      values: [
        { backend: 1, pl: "Opłacony" },
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
      id: 1,
      type: "date",
      name: "From",
      pl: "Data od",
    },
    {
      id: 2,
      type: "date",
      name: "To",
      pl: "Data do",
    },
    {
      id: 3,
      type: "rangeOfAmount",
      name: "PriceFrom",
      pl: "Wartość od",
    },
    {
      id: 4,
      type: "rangeOfAmount",
      name: "PriceTo",
      pl: "Wartość do",
    },
  ];

  const { push } = useHistory();
  const [queryString, setQueryString] = useState("");
  const { id } = useParams<{ id: string }>();
  const [sortBy, setSortBy] =
    useState<{ value: number; label: string } | null>(null);

  const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);

  const cols = {
    orderNumer: "Numer zamówienia",
    date: "Data",
    value: "Wartość",
    relatedProfiles: "Powiązane profile",
    status: "Status",
  };

  const {
    items: orders,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll<any>(
    // @ts-ignore
    artistsService.getAllOrders,
    queryString,
    "UserId",
    id,
  );

  const statusSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Opłacony";

      case 2:
        return "Oczekuje na zapłate";

      case 3:
        return "Otwarty";

      case 4:
        return "Przetwarzany";

      case 5:
        return "Anulowany";

      case 6:
        return "Wstrzymany";

      case 7:
        return "Gotowy do wysłania";

      case 8:
        return "W drodze";

      case 9:
        return "Dostarczony";

      case 10:
        return "Zakończony";

      default:
        return type;
    }
  };

  const compare = (a: any, b: any, sort: any) => {
    if (a[sort] < b[sort]) {
      return 1;
    }
    if (a[sort] > b[sort]) {
      return -1;
    }
    return 0;
  };

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

  const sortingFunction = (type: number, array: any) => {
    switch (type) {
      case 0:
        return array.slice().reverse();
      case 1:
        return array;
      case 2:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "TotalPrice"))
          .reverse();
      case 3:
        return array
          .slice()
          .sort((a: any, b: any) => compare(a, b, "TotalPrice"));
      default:
        return array;
    }
  };
  // @ts-ignore
  const sortedArray = sortingFunction(sortBy?.value, orders);

  return (
    <TabContent id="payments">
      <div
        style={{
          width: "100%",
          height: "50px",
          gap: "20px",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <FilterButton />
        <SelectStatystics
          name="Sort"
          items={sorts}
          label="Sortowanie"
          selectedItem={sortBy}
          setSelectedItem={setSortBy}
          defaultValue={0}
        />

        <FilterPanel filters={filters} />
      </div>
      <div className="w-full text-sm">
        <div className={`grid relative grid-cols-5 gap-1 my-1`}>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">{cols.orderNumer}</span>
          </div>

          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">{cols.date}</span>
          </div>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">{cols.value}</span>
          </div>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">{cols.relatedProfiles}</span>
          </div>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">{cols.status}</span>
          </div>
        </div>

        {orders.length > 0 &&
          sortedArray.map((order: any) => {
            const {
              Number,
              Created,
              TotalPrice,
              OrderState,
              ProfileLicenses,
              OrderId,
            } = order;
            return (
              <div className={`grid relative grid-cols-5 gap-1 my-1`}>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span
                    onClick={() => push(`/shop/orders/detail/${OrderId}`)}
                    className="opacity-70 cursor-pointer hover:text-blue"
                  >
                    {Number}
                  </span>
                </div>

                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{Created.slice(0, 10)}</span>
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">
                    {new Intl.NumberFormat("fr-CA", {
                      minimumFractionDigits: 2,
                    }).format(TotalPrice)}
                  </span>
                </div>
                <div
                  className="bg-white bg-opacity-30 p-12 text-center"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {ProfileLicenses.length > 0 ? (
                    ProfileLicenses.map((singleLicence: any) => {
                      const { ProfileId, ProfileName } = singleLicence;
                      return <span className="opacity-70">{ProfileName}</span>;
                    })
                  ) : (
                    <span className="opacity-70">-</span>
                  )}
                </div>
                <div className="bg-white bg-opacity-30 p-12 text-center">
                  <span className="opacity-70">{statusSwitch(OrderState)}</span>
                </div>
              </div>
            );
          })}
      </div>
    </TabContent>

    //   {showNewCombinations && attributes.length > 0 && (
    //     <>
    //       <div
    //         className={`grid relative grid-cols-${
    //           product.Type === 3 ? 6 + attributes.length : 5 + attributes.length
    //         } gap-1 my-1`}
    //       >
    //         {attributes.map((singleAttribute: any) => {
    //           return (
    //             <div className="bg-white bg-opacity-80 p-12 text-center">
    //               <span className="opacity-70">
    //                 <select
    //                   style={{ background: "#efefef" }}
    //                   name={singleAttribute.Name}
    //                   id=""
    //                   onChange={handleAttributesChange}
    //                 >
    //                   <option value="" disabled hidden selected>
    //                     {singleAttribute.Name}
    //                   </option>
    //                   {singleAttribute.Values.map(
    //                     (attribute: AttributeValue) => {
    //                       const { Name, ValueId } = attribute;
    //                       return <option value={ValueId}>{Name}</option>;
    //                     },
    //                   )}
    //                 </select>
    //               </span>
    //             </div>
    //           );
    //         })}

    // </div>
  );
};

export default PaymentsTab;
