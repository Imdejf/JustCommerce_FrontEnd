// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";
import FormSection from "../../../common/forms/FormSection";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { showServerErrors } from "../../../../utils/errorsUtils";
import TextInput from "components/common/inputs/textInput/TextInput";
import productServices from "services/Product/productServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import categoryServices from "services/Category/categoryServices";
import ProductForm from "./ProductForm";
import { convertToHTML } from 'draft-convert';
import { IProduct } from "../../../../types/Product/product"
const AddProduct: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const [allActiveLanguages, setAllActiveLanguages] = 
    useState<Array<any> | null>(null);
    const { goBack } = useHistory();
    console.log(activeLanguages)
    const product: IProduct = {
      currentUserId: "",
      storeId: "",
      price: 0,
      oldPrice: 0,
      specialPrice: 0,
      specialPriceStart: 0,
      specialPriceEnd: 0,
      isCallForPricing: false,
      isAllowToOrder: true,
      name: "",
      slug: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      sku: "",
      gtin: "",
      ShortDescription: "",
      description: "",
      specification: "",
      isPublished: true,
      isFeatured: false,
      stockTrackingIsEnabled: false,
      taxId: undefined,
      vendorId: undefined,
      brandId: undefined,
      productLangs: [],
      thumbnailImage: {
        base64File: {
          Base64String: "",
        },
        seoFileName: "",
        altAttribute: "",
        titleAttribute: "",
        displayOrder: 0,
        productMediaLangs: activeLanguages?.languages?.map(lang => ({ 
          languageId: lang.id,
          seoFileName: "",
          altAttribute: "",
          titleAttribute: ""
           
        })),
      },
      medias: [],
      categoryIds: [],
      productAttributeValues: [],
      productOptionValues: [],
      variations: [],
      productImages: [],
      productDocuments: [],
      relatedProducts: [],
      crossSellProducts: [],
    };

    function handleLanguageValue(value) {
      setLanguageValue(value);
    }

    useEffect(() => {
        if (activeLanguages !== null) {
            const viewTabToRender = (
                <div className="block">
                    <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
                </div>
              );
              setViewTab(viewTabToRender);
        }
    }, [activeLanguages]);

    const handleSubmit = async (
        product: IProduct,
      ) => {
        try {
          await productServices.add(
            product
          );
          toast.success("Dodano kategorie");
          goBack();
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

      if(!product) {
        return null
      }

      return (
        <ContentContainer
        title="Dodaj produkt"
        path="/catalog/product"
        >
            {viewTab}
            <ProductForm
            product={product}
            currentLanguage={currentLanguageValue}
            activeLanguages={activeLanguages}
            // @ts-ignore
            onSubmit={handleSubmit}
            isEdit={false}
            />
        </ContentContainer>
      )
}

export default AddProduct;