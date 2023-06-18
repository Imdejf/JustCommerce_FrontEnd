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
import attributeServices from "services/Attribute/attributeServices";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { IAttribute } from "../../../../types/Attribute/attributeTypes"
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import ProductAttributeDetailTopBar from "./ProductAttributeDetailTopBar";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import { AttributeInterface } from "../../../../types/Attribute/attributeTypes";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";

const AddProductAttribute: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const { id } = useParams<{ id: string, storeId: string }>();
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);

    const [queryString, setQueryString] = useState("");
    const [attribute, setAttribute] = 
    useState<AttributeInterface | null>(null);

    const [allActiveLanguages, setAllActiveLanguages] = 
    useState<Array<any> | null>(null);

    const [languages, setLanguages] = 
    useState<{ id:string; nameOrginal: string; flagFilePath: string }[]>([]);

    const [currentLanguageValue, setLanguageValue] = useState('');

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    useEffect(() => {
      attributeServices
        .getById(id)
        .then((attributeData) => {
          // @ts-ignore
          setAttribute(attributeData);
        })
        .catch((errors) => {
          showServerErrors(errors);
        });
    }, [id]);

    useEffect(() => {
            if (activeLanguages !== null) {
            let productAttributeLangs = [];            
            activeLanguages.languages.map((language) => {
              const productAttributeLang: IProductAttributeLangs = {
                  LanguageId: language.id,
                  Name: language.nameOrginal,
              };
                
                productAttributeLangs.push(productAttributeLang)
            })
            setAllActiveLanguages(productAttributeLangs)
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
                                <InfoBox.InfoItem label={"Nazwa"} value={`${attribute?.productAttributeLangs[index].name}`} />
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

    if (!attribute) {
      return <InfoBoxPlaceholder />;
    }


    if (!languages) {
        return null;
    }

    return (
        <ContentContainer
        title={`${attribute?.name}`}
        TopBar={
            <ProductAttributeDetailTopBar
            attribute={attribute}/>
        }
        path="/catalog/product-attribute"
        >
            {viewTab}
            <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
              <InfoBox className="bg-white-dirty p-18">
                  <InfoBox.Items>
                      <InfoBox.InfoItem label={"Nazwa"} value={`${attribute.name}`} />
                      <InfoBox.InfoItem label={"Nazwa grupy"} value={`${attribute.attributeGroup.name}`} />
                  </InfoBox.Items>
              </InfoBox>
            </div>
            {view}
        </ContentContainer>
    )
}

export default AddProductAttribute