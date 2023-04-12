import i18next from "i18next";
import * as Yup from "yup";

import { validationMessage } from "utils/validation";

export const productValidation = Yup.object().shape({
     Name: Yup.string().required(validationMessage.isRequired),
     Price: Yup.number().required(validationMessage.isRequired),
    // Description: Yup.string().required(validationMessage.isRequired),
    // Tag: Yup.string().required(validationMessage.isRequired),
  });