import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ContentContainer from "components/layout/ContentContainer";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import Table from "components/common/table/Table";
import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";

import digitalReleaseServices from "services/digitalReleaseService";
import { IDigitalRelease, Product, Delivery } from "types/digitalReleaseTypes";
import Placeholder from "assets/images/placeholder.png";

import DigitalReleaseDetailTopbar from "./DigitalReleaseDetailTopbar";

import BiographyPanel from "./Tabs/PressMaterials/BiographyPanel";
import PhotosPanel from "./Tabs/PressMaterials/PhotosPanel";
import PressMaterialsTab from "./Tabs/PressMaterials/PressMaterialsTab";
import StoredFilesTab from "./Tabs/PressMaterials/StoredFilesTab";
import DetailTable from "components/artists/detail/DetailTable";
import RecommendedPanel from "./Tabs/PressMaterials/RecommendedPanel";
import productServices from "services/productServices";
import logo from "../../../assets/images/logo.svg";
import ProductDescription from "./Tabs/PressMaterials/ProductDescription";
import ProductImages from "./Tabs/PressMaterials/ProductImages";
import DeliveryDetailTable from "./Tabs/PressMaterials/DeliveryDetailTable";
import ConditionsDetailTab from "./Tabs/PressMaterials/ConditionsDetailTab";
import AttributeDetailTable from "./Tabs/PressMaterials/AttributeDetailTable";
import RangeData from "./Tabs/PressMaterials/RangeData";
import SalesStatement from "./Tabs/PressMaterials/SalesStatement";
import RaportOrders from "./Tabs/PressMaterials/RaportOrders";
import Discount from "./Tabs/PressMaterials/Discount";
import { showServerErrors } from "utils/errorsUtils";

const DigitalReleaseDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [deliveries, setDeliveries] = useState([]);
  const [showNewDeliveries, toggleShowNewDeliveries] = useState(false);
  const [showNewCombinations, toggleShowNewCombinations] = useState(false);
  const [editAttributes, toggleEditAtributes] = useState(false);
  const [editDeliveries, toggleEditDeliveries] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [raportOrders, setRaportOrders] = useState([]);
  const [raportCombinations, setRaportCombinations] = useState([]);
  const [raportRefundes, setRaportRefundes] = useState([]);
  const [activeFilter, setActiveFilter] = useState<
    { name: string; value: string }[]
  >([]);
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const refreshProduct = () => {
    productServices
      .getProduct(id)
      .then((product: any) => {
        // @ts-ignore

        setProduct((prev) => ({
          ...prev,
          ProductFiles: product.ProductFiles,
          Deliveries: product.Deliveries,
          Tax: product.Tax,
          Netto: product.Netto,
          Gross: product.Gross,
          Combinations: product.Combinations,
          Documents: product.Documents,
        }));
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  };
  console.log("prod", product);

  const addCombination = async (
    ProductId: string,
    CategoryId: string,
    EAN: string,
    Netto: number,
    Tax: number,
    Amount: number,
    Period: number,
    attributesArray: any,
  ) => {
    if (attributesArray.some((el: any) => !el.Value))
      return toast.error("Uzupełnij wszystkie dane!");
    if (product) {
      try {
        await productServices.addCombination(
          ProductId,
          CategoryId,
          EAN,
          Netto,
          Tax,
          Amount,
          product.Type === 3 ? Period : null,
          attributesArray,
        );
        toast.success("Dodano atrybut!");
        refreshProduct();
        toggleShowNewCombinations(false);
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const editCombination = async (
    ProductId: string,
    CategoryId: string,
    CombinationId: string,
    EAN: string,
    Netto: number,
    Tax: number,
    Amount: number,
    Period: number,
    array: any,
  ) => {
    if (product) {
      try {
        await productServices.editCombination(
          ProductId,
          CategoryId,
          CombinationId,
          EAN,
          Netto,
          Tax,
          Amount,
          product.Type === 3 ? Period : null,
          array,
        );
        toast.success("Edytowano atrybut!");
        refreshProduct();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (product) {
      productServices
        .getAttributesByCategoryId(product.CategoryId)
        .then((attributes: any) => {
          if (attributes.Items) {
            setAttributes(attributes.Items);
          } else {
            setAttributes([]);
          }
        })
        .catch((errors) => {
          showServerErrors(errors);
        });
    }
  }, [id, product]);

  useEffect(() => {
    productServices
      .getProduct(id)
      .then((product: any) => {
        setProduct(product);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      productServices
        .getDeliveryByProductType(product.Type)
        .then((delivery: any) => {
          setDeliveries(delivery.Items);
        })
        .catch((errors) => {
          showServerErrors(errors);
        });
    }
  }, [product]);

  useEffect(() => {
    let from = "";
    let to = "";
    activeFilter.map((filter) => {
      if (filter.name === "from") {
        from = filter.value;
      }
      if (filter.name === "to") {
        to = filter.value;
      }
    });
    productServices
      .getRaportByProductId(id, from, to)
      .then((item: any) => {
        setRaportOrders(item.Orders);
        setRaportCombinations(item.SoldCombinations);
        setRaportRefundes(item.Refundeds);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id, activeFilter]);

  const grantDelivery = async (deliveryId: string) => {
    if (product) {
      try {
        await productServices.grantDelivery(product.ProductId, deliveryId);
        toast.success("Dodano dostawe!");
        refreshProduct();
        toggleShowNewDeliveries(false);
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const revokeDelivery = async (deliveryId: string) => {
    if (product) {
      try {
        await productServices.revokeDelivery(product.ProductId, deliveryId);
        toast.success("Usunięto dostawe!");
        refreshProduct();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const deleteCombination = async (id: string) => {
    if (product) {
      try {
        await productServices.deleteCombination(id);
        toast.success("Usunięto atrybut!");
        refreshProduct();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const filterHandler = (fil: any) => {
    setActiveFilter(fil);
  };

  if (!product) {
    return <InfoBoxPlaceholder />;
  }

  const tabs = [
    {
      tab: {
        id: "supplementaryData",
        label: "Dane uzupełniające",
      },
      content: (
        <TabContent id="supplementaryData">
          <div
            className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
            style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
          >
            <ProductDescription product={product} />
            <ProductImages product={product} refreshProduct={refreshProduct} />
            <RecommendedPanel />
          </div>
        </TabContent>
      ),
    },
    {
      tab: {
        id: "attributes",
        label: "Atrybuty",
      },
      content: (
        <TabContent id="attributes">
          <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
            <AttributeDetailTable
              showNewCombinations={showNewCombinations}
              attributes={attributes}
              toggleShowNewCombinations={toggleShowNewCombinations}
              deleteCombination={deleteCombination}
              label="Atrybuty"
              product={product}
              // @ts-ignore
              addCombination={addCombination}
              editCombination={editCombination}
              editAttributes={editAttributes}
              toggleEditAttributes={toggleEditAtributes}
            />
          </div>
        </TabContent>
      ),
    },

    {
      tab: {
        id: "conditions",
        label: "Warunki",
      },
      content: (
        <TabContent id="conditions">
          <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
            <ConditionsDetailTab
              label="Cena Katalogowa"
              product={product}
              refreshProduct={refreshProduct}
            />
            <Discount
              label="PROMOCJA"
              product={product}
              refreshProduct={refreshProduct}
            />
          </div>
        </TabContent>
      ),
    },

    {
      tab: {
        id: "storedFiles",
        label: "Pliki",
      },
      content: (
        <StoredFilesTab
          key={"storedFiles"}
          product={product}
          refreshProduct={refreshProduct}
        />
      ),
    },

    {
      tab: {
        id: "delivery",
        label: "Dostawa",
      },
      content: (
        <TabContent id="delivery">
          <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
            <DeliveryDetailTable
              showNewDeliveries={showNewDeliveries}
              toggleShowNewDeliveres={toggleShowNewDeliveries}
              deliveries={deliveries}
              product={product}
              label="Dostawy"
              cols={{
                label: "Nazwa",
                value: "Koszt dostawy",
                value2: "Opis",
                value3: "Czas",
              }}
              revokeDelivery={revokeDelivery}
              grantDelivery={grantDelivery}
              editDeliveries={editDeliveries}
              toggleEditDeliveries={toggleEditDeliveries}
              items={product.Deliveries.map((singleDelivery: Delivery) => ({
                label: `${singleDelivery.Name}`,
                value: `${singleDelivery.Gross}`,
                value2: `${singleDelivery.Description}`,
                value3: `${singleDelivery.Deadline}`,
                Id: singleDelivery.DeliveryId,
              }))}
            />
          </div>
        </TabContent>
      ),
    },

    {
      tab: {
        id: "raport",
        label: "Raport",
      },
      content: (
        <TabContent id="raport">
          <div className=" lg:flex-row gap-16 mx-auto w-full">
            <RangeData filterHandler={filterHandler} />
            <SalesStatement
              raportCombinations={raportCombinations}
              raportRefundes={raportRefundes}
            />
            <RaportOrders orders={raportOrders} />
          </div>
        </TabContent>
      ),
    },
  ];

  const typeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "produkt";
      case 2:
        return "usługa";
      case 3:
        return "licencja";
      default:
        return `${type}`;
    }
  };

  return (
    <ContentContainer
      title={product.Name}
      TopBar={
        <DigitalReleaseDetailTopbar
        // digitalRelease={digitalRelease}
        />
      }
      path="/shop/products"
    >
      <div className="flex flex-col gap-1">
        <InfoBox className="bg-white-dirty p-18">
          <InfoBox.Image
            src={product ? product.FtpBannerPhotoFilePath : logo}
          />

          <InfoBox.Items>
            <InfoBox.InfoItem
              label={"Nazwa"}
              // value={digitalRelease.title}
              value={product.Name}
            />
            <InfoBox.InfoItem label={"EAN"} value={product.EAN} />
            <InfoBox.InfoItem
              label={"Dostępność od"}
              value={`${product.AvailableFrom.substring(0, 10)} 00:00`}
            />

            <InfoBox.InfoItem
              label={"Nazwa 2"}
              value={product.ShortDescription}
            />
            <InfoBox.InfoItem
              label={"Kategoria"}
              value={product.CategoryName}
            />
            <InfoBox.InfoItem
              label={"Dostępność do"}
              value={`${product.AvailableTo.substring(0, 10)} 23:59`}
            />

            <InfoBox.InfoItem
              label={"Typ produktu"}
              value={typeSwitch(product.Type)}
            />
            <InfoBox.InfoItem
              label={"Zapas"}
              value={
                product.Combinations.length > 0
                  ? // @ts-ignore
                    `${product.Combinations.reduce(
                      (totalAmount, combination) => {
                        return +totalAmount + +combination.Amount;
                      },
                      0,
                    )}`
                  : "0"
              }
            />
            <InfoBox.InfoItem label={"Tag"} value={product.Tag} />
          </InfoBox.Items>
        </InfoBox>
      </div>

      <TabsView>
        <Tabs tabs={tabs.map((t) => t.tab)} />

        <div style={{ padding: "40px 4vw 0" }}>
          {tabs.map((t) => t.content)}
        </div>
      </TabsView>
    </ContentContainer>
  );
};

export default DigitalReleaseDetail;
