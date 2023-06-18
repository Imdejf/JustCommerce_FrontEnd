import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { createMemoryHistory } from 'history';

type FormikProps = {
  initialValues: { [key: string]: any };
  onSubmit: () => void;
};
const defaultFormikProps: FormikProps = {
  initialValues: { name: '' },
  onSubmit: () => {},
};

export const renderWithFormik = (children: any, formikProps: Partial<FormikProps> = defaultFormikProps) =>
  render(
    <Formik {...defaultFormikProps} {...formikProps}>
      {children}
    </Formik>
  );

export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  const utils = render(ui, { wrapper: BrowserRouter });
  const history = createMemoryHistory();
  history.push = jest.fn();

  return { history, ...utils };
};
