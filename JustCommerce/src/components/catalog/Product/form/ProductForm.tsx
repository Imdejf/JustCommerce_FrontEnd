// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

import DeleteButton from "components/common/buttons/deleteButton/DeleteButton";
import FormSection from "components/common/forms/FormSection";
import SelectCategories from "components/common/inputs/select/SelectCategory";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";
import TextField from "components/common/inputs/textInput/TextField";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import InputSearch from "components/common/inputs/searchInput/InputSearch";
import TabContent from "components/common/tabs/TabContent";

import ImageField from "components/common/inputs/imageInput/ImageField";
import { 
    
 } from "components/common/inputs/inputTypes";
import TextInput from "components/common/inputs/textInput/TextInput";
import { IProduct } from "types/Product/product"
import { categoryValidation } from "../utils/helpers"
import productServices from "services/Product/productServices";

import FormikEditor from "components/common/inputs/htmlEditor/htmlEditor";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";
import { convertToHTML, convertFromHTML } from 'draft-convert';

interface IProductProps {
    product: IProduct;
    currentLanguage:string;
    activeLanguages: any;
    isEdit: boolean;
    onSubmit: any;
}

const ProductForm: React.FC<IProductProps> = ({
    product,
    currentLanguage,
    activeLanguages,
    isEdit,
    onSubmit,
}) => {
    const formik = useRef(null);
    const [view, setView] = useState(null);

    function nameToSlugFunc() {
        var nameToSlug = formik.current.values.Name.replace(/ /g, "-");
        formik.current.setFieldValue('Slug', nameToSlug);
    }
    
    if(!currentUser) {
        return null
    }

    if (!activeLanguages) {
        return null;
    }

    const tabs = [
        {
            tab: {
                id: "GeneralInformation",
                label: "Dane uzupełniające",
            },
            content: (
                <TabContent id="GeneralInformation">
                    <div
                    className="flex flex-col lg:flex-row gap-16 mx-auto w-full"
                    style={{ display: "grid", gridTemplateColumns: "47% 47%" }}
                    >
                        
                    </div>
                </TabContent>
            )
        }
    ]

    return (
        <Formik
        innerRef={formik}
        initialValues={product}
        validationSchema={}
        onSubmit={handleSubmit}
        validateOnMount
        >
            <Form className="handleSubmitflex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                <FormSection label="">

                </FormSection>
            </Form>
        </Formik>
    )
}

export default ProductForm
