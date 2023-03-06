import * as Yup from "yup";
import{ validationMessage } from "../../../../utils/validation";
 
export const productTemplateValidationSchema = Yup.object().shape({
  Name: Yup.string()
    .max(100, validationMessage.max(100))
    .required(validationMessage.isRequired)
});

export const addProductTemplate = {
    Name: ""
}

export const editProductTemplate = {
    Name: ""
}