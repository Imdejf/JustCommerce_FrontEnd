import ContentContainer from "../../../layout/ContentContainer";
import { RootState } from "../../../../store/store";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getNotEmptyFields } from "../../../../utils/objectUtils";
import FormSection from "../../../common/forms/FormSection";
import productTemplateServices from "../../../../services/ProductTemplate/productTemplateServices";
import { showServerErrors } from "utils/errorsUtils";
import { useHistory } from "react-router-dom";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { useSelector } from "react-redux";
import {
    IProductTemplate
  } from "../../../../types/ProductTemplate/productTemplateTypes";
import { addProductTemplate, productTemplateValidationSchema } from "./ProductTemplateHelpers"

const AddProductTemplate: React.FC = () => {
    const { goBack } = useHistory();
    const { currentUser } = useSelector((state: RootState) => state);

    const handleSubmit = async (values: IProductTemplate) => {
        try {
            if(currentUser?.storeId){
                values.storeId = currentUser.storeId;
            }
            const newpProductTemplate = getNotEmptyFields(values);
            await productTemplateServices.add(values)
            toast.success(`Dodano nowy wzór!`);
            goBack();
        } catch(errors:any ) { 
            showServerErrors(errors);
        }
    }

    return (
        <ContentContainer title="Dodaj wzór">
            <Formik
            // @ts-ignore
            initialValues={addProductTemplate}
            onSubmit={handleSubmit}
            validationSchema={productTemplateValidationSchema}
            >
                {({ values, isSubmitting }) => (
                    <Form className="flex flex-col gap-x-6 mx-auto px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
                        <FormSection isDisabled={isSubmitting} label={"Grupa"}>
                            <TextField name="Name" label="Nazwa" />
                        </FormSection>  
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

export default AddProductTemplate;