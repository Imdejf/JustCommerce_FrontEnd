import * as Yup from "yup";
import{ validationMessage } from "../../../../utils/validation";
import { IProductOption } from "types/ProductOption/productOptionTypes";

export const productOptionValidationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(100, validationMessage.max(100))
      .required(validationMessage.isRequired),
  });
  
  export const addProductOption = {
      Name: "",
      ProductOptionLangs:[]
    }
  
  export const editProductOption = {
    Name: "",
    ProductOptionLangs:[]
}