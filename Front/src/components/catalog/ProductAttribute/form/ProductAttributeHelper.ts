import * as Yup from "yup";
import{ validationMessage } from "../../../../utils/validation";
import { IProductAttributeLangs } from "types/Attribute/attributeTypes";

export const productAttributeValidationSchema = Yup.object().shape({
    Name: Yup.string()
      .max(100, validationMessage.max(100))
      .required(validationMessage.isRequired),
  });
  
  export const addProductAttribute = {
      Name: "",
      GroupId: "",
      ProductAttributeLangs:[]
    }
  
  export const editProductAttribute = {
    AttributeId: "",
    Name: "",
    GroupId: "",
    ProductAttributeLangs:[]
}