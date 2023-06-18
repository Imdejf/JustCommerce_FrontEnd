import * as Yup from "yup";

import { validationMessage } from "utils/validation";

export const productValidation = Yup.object().shape({
    // Name: Yup.string().required(validationMessage.isRequired),
    // Slug: Yup.string().required(validationMessage.isRequired),
    // Description: Yup.string().required(validationMessage.isRequired),
    // Tag: Yup.string().required(validationMessage.isRequired),
  });