import { toast } from 'react-toastify';

export const getErrorsArray = (errorObj: { Errors: object } | undefined) =>
  errorObj?.Errors ? Object.values(errorObj.Errors).flat() : ['Nieznany błąd, skontaktuj się z ...'];

//TODO: Zaimplementować lub usunąć w zalezności czy backend będzie zagniezdzał błędy
export const getRequestErrors = (errors: Array<any>) => {
  Object.keys(errors);
};

export const showServerErrors = (errorObj: { Errors: object } | undefined) => {
  console.error({ error: errorObj });
  const errors = getErrorsArray(errorObj).forEach((err) => {
    toast.error(err);
  });
  return errors;
};
