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
import { productOptionValidationSchema } from "./ProductOptionHelper"
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { ProductOptionInterface } from "../../../../types/ProductOption/productOptionTypes"
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";

const EditProductOption: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);
    const { id } = useParams<{ id: string }>();
    const { goBack } = useHistory();

    const [queryString, setQueryString] = useState("");

    const [productOption, setProductOption] = 
    useState<ProductOptionInterface | null>(null);

    const [languages, setLanguages] = 
    useState<{ id:string; nameOrginal: string; flagFilePath: string }[]>([]);

    const [currentLanguageValue, setLanguageValue] = useState('');

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    useEffect(() => {
        productOptionServices
        .getById(id)
        .then((productOptionData) => {
            console.log("xDDD")
            console.log(productOptionData)
            setProductOption(productOptionData)
        })
        .catch((errors) => {
            showServerErrors(errors)
        })
    }, [id])

    // useEffect(() => {
    //         if (activeLanguages !== null) {
    //         let productOptionLangs = [];            
    //         activeLanguages.languages.map((language) => {
    //             const productOptionLang: IProductOptionLangs = {
    //                 LanguageId: language.id,
    //                 Name: language.nameOrginal,
    //             };
                
    //             productOptionLangs.push(productOptionLang)
    //             addProductOption.ProductOptionLangs = productOptionLangs;
    //         })
    //     }
    // }, [activeLanguages])

    useEffect(() => {
        if (activeLanguages !== null) {
          const viewToRender = (
            <div>
                    {activeLanguages.languages.map((language,  index) => (
                        <div className={`${language.id === currentLanguageValue ? "block":"hidden"}`}>
                            <FormSection label={`Podstawowe - ${language.isoCode}`}>
                                <TextField name={`ProductOptionLangs[${index}].name`} label="Nazwa" />
                            </FormSection>
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
                <div>
                    <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
                </div>
              );
              setViewTab(viewTabToRender);
        }
    }, [activeLanguages]);

    if (!languages) {
        return null;
    }

    const handleSearch = (query: string) => {
        setQueryString(query);
    };

    if(!productOption) {
        return null;
    }
    
    const initValues = {
        ProductOptionId: productOption.id,
        StoreId: productOption.storeId,
        Name: productOption.name,
        ProductOptionLangs: productOption.productOptionLangs,       
    }

    const handleSubmit = async (values: ProductOptionInterface) => {
        console.log("xD")
        console.log(values);
        try {
          if(currentUser?.storeId){
            values.storeId = currentUser.storeId;
          }
          await productOptionServices.edit(values);
          toast.success("Edytowano opcje produktu!");
          push("/catalog/product-option");
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

    return (
        <ContentContainer title="Edytuj opcje" path="/catalog/product-option">
            <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={productOptionValidationSchema}>
                {({ values, isSubmitting }) => (
                <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                    {viewTab}
                    <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                    <FormSection isDisabled={isSubmitting} label="Podstawowe">
                        <TextField name="Name" label="Nazwa" />
                    </FormSection>
                    </div>
                    {view}
                    <SubmitButton
                    isSubmitting={isSubmitting}
                    type="submit"
                    className="w-80"
                    >
                    Zapisz
                    </SubmitButton>
                </Form>
            )}
            </Formik>
        </ContentContainer>
    )
}

export default EditProductOption