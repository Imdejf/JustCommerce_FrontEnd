import i18next from "i18next";
import * as Yup from "yup";

import { validationMessage } from "utils/validation";

export const categoryValidation = Yup.object().shape({
    // Name: Yup.string().required(validationMessage.isRequired),
    // Slug: Yup.string().required(validationMessage.isRequired),
    // Description: Yup.string().required(validationMessage.isRequired),
    // Tag: Yup.string().required(validationMessage.isRequired),
  });