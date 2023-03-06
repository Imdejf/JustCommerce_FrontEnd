import React, { useEffect, useState } from "react";
import playerProfileService from "../../../../services/playerProfileServices";
import logo from "../../../../assets/images/logo.svg";
import {
  IUserManagement,
  UserInterface,
  PlayerProfileDetailInterface,
  PlayerCard,
  OrderInterface,
} from "../../../../types/userTypes";
import InfoBox from "../../../common/boxes/InfoBox/InfoBox";
import ContentContainer from "../../../layout/ContentContainer";
import DropdownPanel from "../../../common/panels/DropdownPanel";
import { useParams } from "react-router";
import InfoBoxPlaceholder from "../../../common/boxes/InfoBox/InfoBoxPlaceholder";

import Placeholder from "../../../../assets/images/placeholder.svg";
import PlayerProfilesTopBar from "./OrdersDetailTopBar";
import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import RelatedProfilesTab from "./Tabs/PressMaterials/RelatedProfilesTab";
import CareerTab from "./Tabs/PressMaterials/CareerTab";
import StatisticsTab from "./Tabs/PressMaterials/StatisticsTab";
import OrdersDetailTopBar from "./OrdersDetailTopBar";
import StoredFilesTab from "./Tabs/PressMaterials/StoredFilesTab";
import ProductDescription from "./Tabs/PressMaterials/ProductDescription";
import ProductImages from "./Tabs/PressMaterials/ProductImages";
import RecommendedPanel from "./Tabs/PressMaterials/RecommendedPanel";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import SelectStatystics from "components/common/inputs/select/SelectStatystics";
import orderServices from "services/orderServices";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

const OrdersDetail: React.FC = () => {
  const [statuses, setStatuses] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [userStatuses, setUserStatuses] = useState<
    { value: string; label: string }[]
  >([]);

  // const [userStatusesRefundesChange, setUserStatusesRefundesChange] = useState(
  //   {}
  // );

  const [currentRefundStatusId, setCurrentRefundStatusId] = useState();

  const [status, setStatus] =
    useState<{
      value: number;
      label: string;
    } | null>(null);

  const [order, setOrder] = useState<OrderInterface | null>(null);

  const { id } = useParams<{ id: string }>();

  const editDeliveryState = async () => {
    if (order) {
      if (!status) return toast.error("Wybierz status!");
      try {
        await orderServices.editDeliveryState(order?.Id, +status.value);
        toast.success("Edytowano status!");
        refreshOrder();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  useEffect(() => {
    orderServices
      .getSingleOrder(id)
      .then((orderData) => {
        setOrder(orderData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  const refreshOrder = () => {
    orderServices
      .getSingleOrder(id)
      .then((order: any) => {
        // @ts-ignore

        setOrder((prev) => ({
          ...prev,
          DeliveryHistories: order.DeliveryHistories,
          Documents: order.Documents,
        }));
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  };

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
    // switch (type) {
    //   case 1:
    //     return "Gotowy do wysłania";
    //   case 2:
    //     return "Dostarczony";
    //   case 3:
    //     return "Przetwarzany";
    //   case 4:
    //     return "Zwrot anulowany";
    //   case 5:
    //     return "Zwrot produktu";
    //   case 6:
    //     return "Opłacony";
    //   case 7:
    //     return "Zakończony";
    //   case 8:
    //     return "Zaakceptowany";
    //   default:
    //     return type;
    // }
  };

  const getAllStatuses = async () => {
    try {
      setStatuses([
        {
          label: "Opłacony",
          value: "1",
        },
        {
          label: "Oczekuje na zapłate",
          value: "2",
        },
        {
          label: "Otwarty",
          value: "3",
        },
        {
          label: "Przetwarzany",
          value: "4",
        },
        {
          label: "Anulowany",
          value: "5",
        },
        {
          label: "Wstrzymany",
          value: "6",
        },
        {
          label: "Gotowy do wysłania",
          value: "7",
        },
        {
          label: "W drodze",
          value: "8",
        },
        {
          label: "Dostarczony",
          value: "9",
        },
        {
          label: "Zakończony",
          value: "10",
        },
      ]);
      // setStatuses([
      //   {
      //     label: "Gotowy do wysłania",
      //     value: "1",
      //   },
      //   {
      //     label: "Dostarczony",
      //     value: "2",
      //   },
      //   {
      //     label: "Przetwarzany",
      //     value: "3",
      //   },
      //   {
      //     label: "Zwrot anulowany",
      //     value: "4",
      //   },
      //   {
      //     label: "Zwrot produktu",
      //     value: "5",
      //   },
      //   {
      //     label: "Opłacony",
      //     value: "6",
      //   },
      //   {
      //     label: "Zakończony",
      //     value: "7",
      //   },
      //   {
      //     label: "Zaakceptowany",
      //     value: "8",
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserStatuses = async () => {
    try {
      setUserStatuses([
        {
          label: "Gotowy do wysłania",
          value: "1",
        },
        {
          label: "Dostarczony",
          value: "2",
        },
        {
          label: "Przetwarzany",
          value: "3",
        },
        {
          label: "Zwrot produktu",
          value: "5",
        },
        {
          label: "Zaakceptowany",
          value: "8",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const statusSwitchHandler = async (e: any, idx: any) => {
    //@ts-ignore
    const id = order?.Refunds[idx].Id;
    const val = e.target.value;
    try {
      await orderServices.editStatusRefund(id, +val);
      toast.success("Edytowano status!");
      refreshOrder();
      setCurrentRefundStatusId(val);
    } catch (errors: any) {
      console.error(errors);
    }
  };

  useEffect(() => {
    getAllStatuses();
    getUserStatuses();
  }, []);

  const refundsRejectTransferMoneyHandler = async (idx: any) => {
    //@ts-ignore
    const id = order?.Refunds[idx].Id;
    try {
      await orderServices.declineRefundMoneyTransfer(id);
    } catch (errors: any) {
      console.error(errors);
    }
  };

  const refundsAcceptTransferMoneyHandler = async (idx: any) => {
    //@ts-ignore
    const id = order?.Refunds[idx].Id;
    try {
      await orderServices.acceptRefundMoneyTransfer(id);
    } catch (errors: any) {
      console.error(errors);
    }
  };

  if (!order) {
    return <InfoBoxPlaceholder />;
  }

  const tabs = [
    {
      tab: {
        id: "products",
        label: "Produkty",
      },
      content: (
        <TabContent id="products">
          <div className={`grid grid-cols-6 gap-1 my-1`}>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"Zdjecie"}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"Atrybuty"}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"EAN"}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"ILOŚĆ"}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"CENA JEDN."}</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span style={{ color: "gray" }}>{"SUMA"}</span>
            </div>

            {order.Items.map((item) => {
              const { EAN, Quantity, CurrentPrice, TotalTax } = item;
              return (
                <>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.FtpPhotoFilePath ? item.FtpPhotoFilePath : logo}
                      alt=""
                    />
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <span className="opacity-70">
                      {item.Combination
                        ? item.Combination.AttributeValues.map(
                            (singleAttribute, index, row) => {
                              const { ValueName } = singleAttribute;
                              if (index + 1 === row.length)
                                return `${ValueName}`;
                              return `${ValueName}, `;
                            }
                          )
                        : "-"}
                    </span> */}
                    <span className="opacity-70">
                      {item.Name ? item.Name : "-"}
                    </span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{EAN}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{Quantity}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{`${CurrentPrice}`}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{`${TotalTax}`}</span>
                  </div>
                </>
              );
            })}
          </div>
        </TabContent>
      ),
    },

    {
      tab: {
        id: "delivery",
        label: "Dostawa",
      },
      content: (
        //  @ts-ignore
        <RelatedProfilesTab order={order} />
      ),
    },
    {
      tab: {
        id: "documents",
        label: "Dokumenty",
      },
      content: <StoredFilesTab order={order} refreshOrder={refreshOrder} />,
    },
    {
      tab: {
        id: "status",
        label: "Historia statusów",
      },
      content: (
        <TabContent id="status">
          <div
            className="px-18 flex justify-end py-8 bg-white opacity-80 rounded-t-sm"
            style={{ gap: "10px", zIndex: 99 }}
          >
            <SelectStatystics
              name="status"
              items={statuses}
              label="Status"
              // @ts-ignore
              selectedItem={status}
              // @ts-ignore
              setSelectedItem={setStatus}
            />
            <Button
              onClick={() => editDeliveryState()}
              variant={ButtonVariant.Submit}
            >
              Zapisz
            </Button>
          </div>
          {order.DeliveryHistories && (
            <div className={`grid grid-cols-3 gap-1 my-1`}>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"STATUS"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"DATA"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"PRACOWNIK"}</span>
              </div>

              {order.DeliveryHistories.map((singleDeliveryHistory) => {
                const { State, Updated, Employee } = singleDeliveryHistory;
                return (
                  <>
                    <div className="bg-white bg-opacity-40 p-12 text-center">
                      <span style={{ color: "gray" }}>{`${statusSwitch(
                        State,
                      )}`}</span>
                    </div>
                    <div className="bg-white bg-opacity-40 p-12 text-center">
                      <span style={{ color: "gray" }}>{`${Updated.slice(
                        0,
                        10,
                      )}, ${Updated.slice(11, 19)}`}</span>
                    </div>
                    <div className="bg-white bg-opacity-40 p-12 text-center">
                      <span style={{ color: "gray" }}>
                        {Employee ? Employee : "-"}
                      </span>
                    </div>
                  </>
                );
              }).reverse()}
            </div>
          )}
        </TabContent>
      ),
    },
    {
      tab: {
        id: "messages",
        label: "Wiadomości",
      },
      content: (
        <TabContent id="messages">
          <div
            className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
            style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
          >
            <ProductDescription order={order} />
          </div>
        </TabContent>
      ),
    },
    {
      tab: {
        id: "refunds",
        label: "Zwroty",
      },
      content: (
        <TabContent id="refunds">
          {order.Refunds.length > 0 ? (
            <div className={`grid grid-cols-9 gap-1 my-1`}>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"Data"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"Zdjecie"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"Atrybuty"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"EAN"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"ILOŚĆ"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"CENA JEDN."}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"SUMA"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"Status"}</span>
              </div>
              <div className="bg-white bg-opacity-80 p-12 text-center">
                <span style={{ color: "gray" }}>{"Transfer pieniędzy"}</span>
              </div>
            </div>
          ) : (
            <div>Brak zwrotów.</div>
          )}
          {order.Refunds.map((refund, idx) => {
            const {
              Quantity,
              CurrentPrice,
              TotalTax,
              Created,
              Status,
              Combination,
            } = refund;
            const { EAN, FtpPhotoFilePath } = Combination;
            return (
              <>
                <div key={idx} className={`grid grid-cols-9 gap-1 my-1`}>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{Created.slice(0, 10)}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={FtpPhotoFilePath ? FtpPhotoFilePath : logo}
                      alt=""
                    />
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{"Biały, XS"}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{EAN}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{Quantity}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{`${CurrentPrice}`}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">{`${TotalTax}`}</span>
                  </div>
                  <div
                    className="bg-white bg-opacity-40  text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      name=""
                      id=""
                      onChange={(e) => {
                        statusSwitchHandler(e, idx);
                      }}
                      style={{
                        background: "rgba(255,255,255,0.5)",
                        maxWidth: "100%",
                      }}
                    >
                      <option selected hidden disabled>
                        {statusSwitch(Status)}
                      </option>

                      {userStatuses &&
                        userStatuses.map((combination) => {
                          const { value, label } = combination;

                          return <option value={value}>{label}</option>;
                        })}
                    </select>
                  </div>
                  <div
                    className="bg-white bg-opacity-40 p-12 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="opacity-70">
                      {Status <= 5 ? (
                        <>
                          <button
                            className="button button--abort py-4 px-18"
                            onClick={() => {
                              refundsRejectTransferMoneyHandler(idx);
                            }}
                          >
                            Odrzuć
                          </button>
                        </>
                      ) : Status >= 8 ? (
                        <>
                          <button
                            className="button button--submit py-4 px-18"
                            onClick={() => {
                              refundsAcceptTransferMoneyHandler(idx);
                            }}
                          >
                            Akceptuj
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </TabContent>
      ),
    },
  ];

  return (
    <ContentContainer
      title={`Zamówienie`}
      TopBar={
        <OrdersDetailTopBar
          IsActivate={false}
          status={
            order.DeliveryHistories[order.DeliveryHistories.length - 1].State
          }
        />
      }
      path="/shop/orders"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          {/* <InfoBox.Image
            // src={
            //   order.FtpPhotoFilePath
            //     ? order.FtpPhotoFilePath
            //     : Placeholder
            // }
            src={Placeholder}
          /> */}

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={"Zamówienie"}
              value={`${order.Numer ?? "-"}`}
            />

            <InfoBox.InfoItem
              label={"Imię nazwisko"}
              value={`${order.User.FirstName} ${order.User.LastName}`}
            />

            <InfoBox.InfoItem
              label={"Wartość"}
              value={new Intl.NumberFormat("fr-CA", {
                minimumFractionDigits: 2,
              }).format(order.TotalTax)}
            />
          </InfoBox.Items>
        </InfoBox>
        <TabsView>
          <Tabs tabs={tabs.map((t) => t.tab)} />

          <div style={{ padding: "20px 3vw 0" }}>
            {tabs.map((t) => t.content)}
          </div>
        </TabsView>
      </div>
    </ContentContainer>
  );
};

export default OrdersDetail;
