import { validationMessage } from 'utils/validation';
import * as Yup from 'yup';

export const trackValidations = Yup.object().shape({
  title: Yup.string().required(validationMessage.isRequired),
});
