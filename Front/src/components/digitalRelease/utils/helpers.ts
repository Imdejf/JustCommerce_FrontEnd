import i18next from "i18next";
import * as Yup from "yup";

import { validationMessage } from "utils/validation";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  MusicProductStatus,
  ProductType,
  VatType,
} from "types/digitalReleaseTypes";
import { enumToSelectOptions } from "../../../utils/baseUtils";

export const digitalReleaseValidation = Yup.object().shape({
  Name: Yup.string().required(validationMessage.isRequired),
  EAN: Yup.string()
    .length(9, validationMessage.length(9))
    .required(validationMessage.isRequired),
  ShortDescription: Yup.string().required(validationMessage.isRequired),
  // Type: Yup.string().required(validationMessage.isRequired),
  // Tax: Yup.string().required(validationMessage.isRequired),
  // Netto: Yup.number().required(validationMessage.isRequired),
  Tag: Yup.string().required(validationMessage.isRequired),
});

export const formatDataToRequest = (data: IDigitalRelease) => {
  const request: DigitalReleaseRequest = { ...data };
  return request;
};

export const getStatusOptions = () => {
  const options = enumToSelectOptions(MusicProductStatus).map(
    ({ value, label }) => ({
      value,
      label: i18next.t(`digitalRelease.statuses.${label}`),
    }),
  );
  return options;
};

export const getTypeOptions = () => {
  const options = enumToSelectOptions(ProductType).map(({ value, label }) => ({
    value,
    label,
  }));
  return options;
};

export const getVatOptions = () => {
  const options = enumToSelectOptions(VatType).map(({ value, label }) => ({
    value,
    label,
  }));
  return options;
};
