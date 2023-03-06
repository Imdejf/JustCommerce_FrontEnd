import * as Yup from "yup";
import{ validationMessage } from "../../../../utils/validation";
 
export const productAttributeGroupValidationSchema = Yup.object().shape({
  Name: Yup.string()
    .max(100, validationMessage.max(100))
    .required(validationMessage.isRequired)
});

export const addProductAttributeGroup = {
    Name: ""
}

export const editProductAttributeGroup = {
    Name: ""
}