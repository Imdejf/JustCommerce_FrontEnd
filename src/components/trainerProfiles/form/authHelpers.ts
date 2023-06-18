import * as Yup from "yup";
import { Regex } from "../../../utils/constants/constants";
import { validationMessage } from "../../../utils/validation";

export const loginInitValues: any = {
  Email: "",
  Password: "",
};

export const passwordRegEx =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_+=-?])(?=^.{8,100}$)/;

export const loginValidationSchema = Yup.object().shape({
  Email: Yup.string()
    .max(100, validationMessage.max(100))
    .required(validationMessage.isRequired),
  Password: Yup.string()
    .max(100, validationMessage.max(100))
    // .matches(passwordRegEx, validationMessage.weekPassword)
    .required(validationMessage.isRequired),
});

export const addPlayerProfileInitValues = {
  PhotoFile: {
    FtpPhotoFilePath: "/",
  },

  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Email: "",
  LicenseId: "",
  Description: "",
  PostCode: "",
  FlatNumber: "",
  BuildingNumber: "",
  Street: "",
  City: "",
  Region: "",
};

export const categoryValidationSchema = Yup.object().shape({
  Name: Yup.string().required(validationMessage.isRequired),
});

export const addPlayerProfileValidationSchema = Yup.object().shape({
  FirstName: Yup.string().required(validationMessage.isRequired),
  LastName: Yup.string().required(validationMessage.isRequired),
  Email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.isRequired),
  PhoneNumber: Yup.string()
    .required(validationMessage.isRequired)
    .max(15, validationMessage.max(15))
    .matches(Regex.phone, validationMessage.invalidPhone),
  LicenseId: Yup.string().required(validationMessage.isRequired),
  Description: Yup.string().required(validationMessage.isRequired),
  PostCode: Yup.string().required(validationMessage.isRequired),
  FlatNumber: Yup.string().required(validationMessage.isRequired),
  BuildingNumber: Yup.string().required(validationMessage.isRequired),
  Street: Yup.string().required(validationMessage.isRequired),
  City: Yup.string().required(validationMessage.isRequired),
  Region: Yup.string().required(validationMessage.isRequired),
});

export const editPlayerProfileValidationSchema = Yup.object().shape({
  FirstName: Yup.string().required(validationMessage.isRequired),
  LastName: Yup.string().required(validationMessage.isRequired),
  Email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.isRequired),
  PhoneNumber: Yup.string()
    .required(validationMessage.isRequired)
    .max(15, validationMessage.max(15))
    .matches(Regex.phone, validationMessage.invalidPhone),
  LicenseId: Yup.string().required(validationMessage.isRequired),
  Description: Yup.string().required(validationMessage.isRequired),
  PostCode: Yup.string().required(validationMessage.isRequired),
  FlatNumber: Yup.string().required(validationMessage.isRequired),
  BuildingNumber: Yup.string().required(validationMessage.isRequired),
  Street: Yup.string().required(validationMessage.isRequired),
  City: Yup.string().required(validationMessage.isRequired),
  Region: Yup.string().required(validationMessage.isRequired),
});

export const forgotPasswordInitValues = {
  email: "",
};

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.isRequired),
});
