import i18next from "i18next";

import { IFile, ImageFile } from "../types/globalTypes";
import { AvailableFormats, MaxFileSize } from "./constants/constants";

import * as Yup from "yup";

const nbsp = "\xa0";

export const validationMessage = {
  invalidEmail: i18next.t("validation.invalidEmail"),
  invalidImage: i18next.t("validation.invalidImage"),
  invalidNip: i18next.t("validation.invalidNip"),
  invalidPdf: i18next.t("validation.invalidPdf"),
  invalidFile: i18next.t("validation.invalidFile"),
  invalidPesel: i18next.t("validation.invalidPesel"),
  invalidPhone: i18next.t("validation.invalidPhone"),
  isRequired: i18next.t("validation.isRequired"),
  isRequiredOneOf: i18next.t("validation.isRequiredOneOf"),
  weekPassword: i18next.t("validation.weekPassword"),
  passwordsDontMatch: i18next.t("validation.passwordsDontMatch"),
  minItems: (minItems: number) =>
    i18next.t("validation.minItems", { minItems }),
  length: (length: number) => i18next.t("validation.length", { length }),
  min: (length: number) => i18next.t("validation.min", { length }),
  max: (length: number) => i18next.t("validation.max", { length }),
};

export const validateFile = {
  image: (name: string) =>
    Yup.mixed().test({
      name,
      message: validationMessage.invalidImage,
      test: (fileData: ImageFile) => {
        if (!fileData?.file) {
          return true;
        }

        if (
          fileData.file.size > MaxFileSize.Image ||
          !AvailableFormats.Image.includes(fileData.file.type)
        ) {
          return false;
        }

        return true;
      },
    }),
  pdf: (name: string) =>
    Yup.mixed().test({
      name,
      message: validationMessage.invalidPdf,
      test: (fileData: IFile) => {
        if (!fileData?.file) {
          return true;
        }

        if (
          fileData.file.size > MaxFileSize.Pdf ||
          !AvailableFormats.Pdf.includes(fileData.file.type)
        ) {
          return false;
        }

        return true;
      },
    }),
  storedFile: (name: string) =>
    Yup.mixed().test({
      name,
      message: validationMessage.invalidFile,
      test: (fileData: IFile) => {
        if (!fileData?.file) {
          return true;
        }

        if (
          fileData.file.size > MaxFileSize.StoragedFile ||
          !AvailableFormats.StoragedFile.includes(fileData.file.type)
        ) {
          return false;
        }

        return true;
      },
    }),
};

export const validateNip = (nip: string) => {
  if (!nip || !nip.match(/^[0-9]{10}$/)) {
    return false;
  }

  const nipWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return isCorrectNipControlSum(nip, nipWeights);
};

const isCorrectNipControlSum = (nip: string, weights: Array<number>) => {
  const sum = weights.reduce((acc, cur, i) => acc + parseInt(nip[i]) * cur, 0);

  if (sum === 0) {
    return false;
  }

  const controlSum = sum % 11 === 10 ? 0 : sum % 11;
  return controlSum === parseInt(nip[weights.length]);
};

export const validatePesel = (pesel: string) => {
  if (!pesel || !pesel.match(/^[0-9]{11}$/)) {
    return false;
  }

  const month = parseInt(pesel.substring(2, 4));
  if (!month || month % 20 > 12) {
    return false;
  }

  const day = parseInt(pesel.substring(4, 6));
  if (!day || day < 1 || day > 31) {
    return false;
  }

  const peselWeights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  return isCorrectPeselControlSum(pesel, peselWeights);
};

const isCorrectPeselControlSum = (pesel: string, weights: Array<number>) => {
  const sum = weights.reduce((acc, cur, i) => {
    const currentValue = parseInt(pesel[i]) * cur;
    return acc + (currentValue % 10);
  }, 0);

  if (sum === 0) {
    return false;
  }

  const controlSum = 10 - (sum % 10);
  return controlSum === parseInt(pesel[weights.length]);
};
