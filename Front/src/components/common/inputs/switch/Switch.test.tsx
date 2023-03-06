import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { renderWithFormik } from '../../../../utils/testUtils';

import Switch from './Switch';

import { IInputProps } from '../inputTypes';

const initProps: IInputProps = {
  name: 'switchInput',
};

const formikProps = {
  initialValues: {
    [initProps.name]: { checked: false },
  },
};

const renderInput = (props?: Partial<IInputProps>) => {
  const utils = renderWithFormik(<Switch {...initProps} {...props} />, formikProps);
  const label = utils.getByTestId('switchContainer');
  const input = utils.getByTestId('switchInput') as HTMLInputElement;
  return { input, label, ...utils };
};

describe('Switch component', () => {
  test('should render correctly', () => {
    const { input } = renderInput();
    expect(input.checked).toBe(false);
    expect(input).toBeInTheDocument();
  });

  test('should set proper defaultValue', async () => {
    const { getByTestId } = renderWithFormik(<Switch {...initProps} {...initProps} />, {
      ...formikProps,
      initialValues: { [initProps.name]: { checked: true } },
    });
    const input = getByTestId('switchInput') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  test('should set proper value on click', async () => {
    const { label, input } = renderInput();
    const initChecked = formikProps.initialValues[initProps.name].checked;
    await waitFor(() => userEvent.click(label));
    expect(input.checked).toBe(!initChecked);

    await waitFor(() => userEvent.click(label));
    expect(input.checked).toBe(initChecked);

    await waitFor(() => userEvent.click(label));
    expect(input.checked).toBe(!initChecked);
  });
});
