// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";
import FormSection from "../../../common/forms/FormSection";
import productServices from "../../../../services/Product/productServices"
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { showServerErrors } from "../../../../utils/errorsUtils"; 
import TextInput from "components/common/inputs/textInput/TextInput";
import { ProductDTO, ProductAvailability } from "types/Product/product";
import ProductDetailTopBar from "./ProductDetailTopBar"
import ProductImages from "./tabs/ProductImages";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import Tabs from "components/common/tabs/Tabs";
import TabsView from "components/common/tabs/TabsView";
import TabContent from "components/common/tabs/TabContent";
import ProductVariation from "./tabs/ProductVariation"
import ProductOption from "./tabs/ProductOption"
import ProductAttribute from "./tabs/ProductAttribute";
import ProductCategory from "./tabs/ProductCategory"

const ProductDetail: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const { id } = useParams<{ id: string, storeId: string }>();
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const [product, setProduct] = 
    useState<ProductDTO | null>(null);

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    useEffect(() => {
      if(product == null){
        productServices
        .getById(id)
        .then((response) => {
            setProduct(response)
        })
        .catch((errors) => {
            showServerErrors(errors);
        });
      }
    },[])

    useEffect(() => {
        if (activeLanguages !== null) {
            const viewTabToRender = (
                <div className="block">
                    <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
                </div>
              );
              setViewTab(viewTabToRender);
        }
    }, [activeLanguages])

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
                style={{ display: "grid", gridTemplateColumns: "100%" }}
              >
                <ProductImages product={product} />
              </div>
            </TabContent>
          ),
        },
        {
            tab: {
              id: "variation",
              label: "Warianty produktu",
            }, 
            content: (
              <TabContent id="variation">
                <div
                  className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                  style={{ display: "grid", gridTemplateColumns: "100%" }}
                >
                    <ProductOption
                    product={product}/>
                    <ProductVariation
                    product={product}
                    activeLanguages={activeLanguages}
                    />
                </div>
              </TabContent>
            ),
          },
          {
            tab: {
              id: "atribute",
              label: "Atrybuty",
            },
            content: (
                <TabContent id="atribute">
                <div
                  className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                  style={{ display: "grid", gridTemplateColumns: "100%" }}
                >
                  <ProductAttribute
                  product={product}
                  activeLanguages={activeLanguages}/>
                </div>
              </TabContent>
            ),
          },
          {
            tab: {
              id: "category",
              label: "Kategorie",
            },
            content: (
              <TabContent id="category">
                <div
                  className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                  style={{ display: "grid", gridTemplateColumns: "100%" }}
                > 
                <ProductCategory
                product={product}/>
                </div>
              </TabContent>
            ),
          },
          {
            tab: {
              id: "relatedProduct",
              label: "Produkty podobne",
            },
            content: (
              <TabContent id="relatedProduct">
                <div
                  className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                  style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                >
                </div>
              </TabContent>
            ),
          },
          {
            tab: {
              id: "seo",
              label: "SEO",
            },
            content: (
              <TabContent id="seo">
                <div
                  className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                  style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                >
                </div>
              </TabContent>
            ),
          },
    ]

    return (
        <ContentContainer
        title={`${product?.name}`}
        TopBar={
            <ProductDetailTopBar
            category={product}
            path="/catalog/category"/>
        }>
        {viewTab}
        <div className="flex flex-col gap-1">
            <InfoBox className="bg-white-dirty p-18">
            <InfoBox.Image
                src={product?.thumbnailImageUrl}
            />
                <InfoBox.Items>
                    <InfoBox.InfoItem
                    label={"Nazwa produktu"}
                    value={product?.name}
                    />
                    <InfoBox.InfoItem
                    label={"Ścieżka"}
                    value={product?.slug}
                    />
                    <InfoBox.InfoItem
                    label={"Dostępność produktu"}
                    value={ProductAvailability[product?.productAvailability]}
                    />
                    <InfoBox.InfoItem
                    label={"Cena"}
                    value={product?.price}
                    />
                    <InfoBox.InfoItem
                    label={"Publiczny"}
                    value={product?.isPublished.toString()}
                    />
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
    )
}

export default ProductDetail