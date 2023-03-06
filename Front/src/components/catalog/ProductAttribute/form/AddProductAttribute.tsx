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
import attributeGroupServices from "services/Attribute/attributeGroupServices";
import attributeServices from "services/Attribute/attributeServices";
import { addProductAttribute, productAttributeValidationSchema } from "./ProductAttributeHelper"
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { IAttribute } from "../../../../types/Attribute/attributeTypes"
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";

const AddProductAttribute: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);

    const [queryString, setQueryString] = useState("");
    const [attributeGroup, setAttributeGroup] = 
    useState<{ value: number; label: string } | null>(null);

    const [attributeGroups, setAttributeGroups] = 
    useState<{ value: string; label: string }[]>([]);

    const [languages, setLanguages] = 
    useState<{ id:string; nameOrginal: string; flagFilePath: string }[]>([]);

    const [currentLanguageValue, setLanguageValue] = useState('');

    function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    const getAllAttributeGroups = async () => {
        try{
            const resp = await attributeGroupServices.getDropDown(currentUser.storeId, queryString)

            const attributeArray: any = [];
    
            const attributeObject = Object.values(resp);

            attributeObject[0].map((attribute, index) => {
                attributeArray.push({
                    label: `${attribute.name}`,
                    value: `${attribute.id}`
                })
            });

            setAttributeGroups(attributeArray);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllAttributeGroups();
    }, []);

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
            addProductAttribute.ProductAttributeLangs = productAttributeLangs;

        }
    }, [activeLanguages])

    useEffect(() => {
        if (activeLanguages !== null) {
          const viewToRender = (
            <div>
                    {addProductAttribute.ProductAttributeLangs.map((language,  index) => (
                        <div className={`${language.LanguageId === currentLanguageValue ? "block":"hidden"}`}>
                            <FormSection label={language.id}>
                                <TextField name={`ProductAttributeLangs[${index}].Name`} label="Nazwa" />
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

    const handleSubmit = async (values: IAttribute) => {
        if (!attributeGroup) return toast.error("Wybierz grupe!");
        try {
          if(currentUser?.storeId){
            values.storeId = currentUser.storeId;
            values.GroupId = attributeGroup.value;
          }
          console.log(values)
          await attributeServices.add(values);
          toast.success("Dodano nowy atrybut!");
          push("/catalog/product-attribute");
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

    return (
        <ContentContainer title="Dodaj atrybut" path="/catalog/product-attribute">
            <Formik
            initialValues={addProductAttribute}
            onSubmit={handleSubmit}
            validationSchema={productAttributeValidationSchema}>
                {({ values, isSubmitting }) => (
                <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                    {viewTab}
                    <p>Child value: {currentLanguageValue}</p>
                    <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                    <FormSection isDisabled={isSubmitting} label="Podstawowe">
                        <TextField name="Name" label="Nazwa" />
                        <SelectProfiles
                        name="GroupId"
                        items={attributeGroups}
                        label="Grupa"
                        selectedItem={attributeGroup}
                        setSelectedItem={setAttributeGroup}
                        // defaultValue={values.profile}
                    />
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

export default AddProductAttribute