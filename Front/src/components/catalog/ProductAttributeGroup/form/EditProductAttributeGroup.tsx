import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";

import { showServerErrors } from "../../../../utils/errorsUtils";
import FormSection from "../../../common/forms/FormSection";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import productAttributeGroupServices from "services/Attribute/attributeGroupServices"
import { editProductAttributeGroup, productAttributeGroupValidationSchema } from "./AttributeGroupHeleprs";

import { AttributeGroupInterface } from "../../../../types/Attribute/attributeGroupTypes"
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";


const EditProductAttributeGroup: React.FC = () => {
    const [attributeGroup, setAttributeGroup] = 
    useState<AttributeGroupInterface | null>(null)
    const { id } = useParams<{ id: string }>();
    const { goBack } = useHistory();

    const { currentUser } = useSelector((state: RootState) => state);

    useEffect(() => {
        productAttributeGroupServices
        .getById(id)
        .then((productAttributeGroupData) => {
            setAttributeGroup(productAttributeGroupData)
        })
        .catch((errors) => {
            showServerErrors(errors)
        })
    }, [id])

    if (!attributeGroup) {
        return null;
      }

    const initValues = {
        Name: attributeGroup.name,
    };

    
  const handleSubmit = async (values: typeof initValues) => {
    try {
      const editedAttributeGroup = {
        AttributeGroupId: id,
        StoreId: currentUser?.storeId,
        ...values,
      };
      //@ts-ignore
      await productAttributeGroupServices.edit(editedAttributeGroup);
      toast.success(`Edytowano grupę atrybutów!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title="Edycja grupy" path={`/catalog/product-atribute-group/detail/${id}`}>
        <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={productAttributeGroupValidationSchema}
        >
        {({ values, isSubmitting }) => (
            <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label="Podstawowe">
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

export default EditProductAttributeGroup;
