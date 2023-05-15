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

const AddBlogCategory: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);

    const handleSubmit = async (values: IAttribute) => {
        try {

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

            </Formik>
        </ContentContainer>
    )
}

export default AddBlogCategory