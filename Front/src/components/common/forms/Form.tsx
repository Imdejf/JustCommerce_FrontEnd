import { Formik, FormikProps, FormikValues, Form, FormikConfig } from 'formik';
import React from 'react';

type Props = {
  children: (formikProps: FormikProps<FormikValues> & { editable: boolean }) => JSX.Element;
} & Omit<FormikConfig<FormikValues>, 'children'>;

const EditableForm = ({ children, ...props }: Props) => {
  return <Formik {...props}>{(formikProps) => <Form>{children({ editable: true, ...formikProps })}</Form>}</Formik>;
};

export default EditableForm;
