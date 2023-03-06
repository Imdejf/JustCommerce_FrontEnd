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
import productOptionServices from "services/ProductOption/productOptionServices";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import ProductOptionDetailTopBar from "./ProductOptionDetailTopBar";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import { IProductOption, ProductOptionInterface } from "types/ProductOption/productOptionTypes";

const AddProductOption: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const { id } = useParams<{ id: string, storeId: string }>();
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);

    const [queryString, setQueryString] = useState("");
    const [productOption, setProductOption] = 
    useState<ProductOptionInterface | null>(null);

    const [allActiveLanguages, setAllActiveLanguages] = 
    useState<Array<any> | null>(null);

    const [currentLanguageValue, setLanguageValue] = useState('');

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    useEffect(() => {
        productOptionServices
        .getById(id)
        .then((productOptionData) => {
          // @ts-ignore
          setProductOption(productOptionData);
        })
        .catch((errors) => {
          showServerErrors(errors);
        });
    }, [id]);

    useEffect(() => {
            if (activeLanguages !== null) {
            let productOptionLangs = [];            
            activeLanguages.languages.map((language) => {
              const productOptionLang: IProductOptionLangs = {
                  LanguageId: language.id,
                  Name: language.nameOrginal,
              };
                
              productOptionLangs.push(productOptionLang)
            })
            setAllActiveLanguages(productOptionLangs)
        }
    }, [activeLanguages])

    useEffect(() => {
        if (allActiveLanguages !== null) {

          const viewToRender = (
            <div>
                    {allActiveLanguages.map((language,  index) => (
                        <div className={`${language.LanguageId === currentLanguageValue ? "block":"hidden"}`}>
                        <InfoBox className="bg-white-dirty p-18">
                            <InfoBox.Items>
                                <InfoBox.InfoItem label={"Nazwa"} value={`${productOption?.productOptionLangs[index].name}`} />
                            </InfoBox.Items>
                        </InfoBox>
                        </div>
                    ))}            
            </div>
          );
          setView(viewToRender);
        }
      }, [currentLanguageValue]);

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

    if (!productOption) {
      return <InfoBoxPlaceholder />;
    }


    if (!activeLanguages) {
        return null;
    }

    return (
        <ContentContainer
        title={`${productOption?.name}`}
        TopBar={
            <ProductOptionDetailTopBar
            productOption={productOption}/>
        }
        path="/catalog/product-option"
        >
            {viewTab}
            <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
              <InfoBox className="bg-white-dirty p-18">
                  <InfoBox.Items>
                      <InfoBox.InfoItem label={"Nazwa"} value={`${productOption.name}`} />
                  </InfoBox.Items>
              </InfoBox>
            </div>
            {view}
        </ContentContainer>
    )
}

export default AddProductOption