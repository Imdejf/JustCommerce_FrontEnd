import * as Yup from "yup";
import { Regex } from "../../utils/constants/constants";
import { validationMessage } from "../../utils/validation";
import { Values } from "./LoginForm";

export const loginInitValues: Values = {
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

export const registerInitValues = {
  Email: "",
  FirstName: "",
  LastName: "",
  Password: "",
  ReplyPassword: "",
  FtpPhotoFilePath: "/",
  Position: "",
  Theme: 0,
  Profile: 0,
  PhoneNumber: "",
  Nickname: "",
};

export const categoryValidationSchema = Yup.object().shape({
  Name: Yup.string().required(validationMessage.isRequired),
});

export const registerValidationSchema = Yup.object().shape({
  Email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.isRequired),
  FirstName: Yup.string().required(validationMessage.isRequired),
  LastName: Yup.string().required(validationMessage.isRequired),
  Password: Yup.string()
    .matches(passwordRegEx, validationMessage.weekPassword)
    .required(validationMessage.isRequired),
  ReplyPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], validationMessage.passwordsDontMatch)
    .required(validationMessage.isRequired),
  PhoneNumber: Yup.string()
    .required(validationMessage.isRequired)
    .max(15, validationMessage.max(15))
    .matches(Regex.phone, validationMessage.invalidPhone),
  Position: Yup.string().required(validationMessage.isRequired),
  Nickname: Yup.string().required(validationMessage.isRequired),
});

export const forgotPasswordInitValues = {
  email: "",
};

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email(validationMessage.invalidEmail)
    .required(validationMessage.isRequired),
});
