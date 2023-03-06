import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import SelectInput from './Select';

import { renderWithFormik } from '../../../../utils/testUtils';
import { ISelectProps } from '../inputTypes';

const initProps: ISelectProps = {
  name: 'selectInput',
  items: [
    { label: 'test item 1', value: 1 },
    { label: 'test item 2', value: 2 },
  ],
};

const renderInput = (props?: Partial<ISelectProps>) => {
  const utils = renderWithFormik(<SelectInput {...initProps} {...props} />);
  const input = utils.getByTestId('selectInput');
  const value = utils.getByTestId('selectValue').innerHTML;
  const optionsContainer = utils.getByTestId('selectOptions');
  const options = optionsContainer.querySelectorAll('div');
  return { input, value, optionsContainer, options, ...utils };
};

describe('Select input component', () => {
  test('should render correctly', () => {
    const { input } = renderInput(initProps);
    expect(input).toBeInTheDocument();
  });

  test('should expand items on focus', () => {
    const { input, optionsContainer, options } = renderInput();
    expect(optionsContainer).toHaveClass('hidden');
    userEvent.click(input);
    expect(optionsContainer).not.toHaveClass('hidden');
    expect(options.length).toBe(2);
  });

  test('should set value and hidden option after', async () => {
    const { input, options, value } = renderInput();
    userEvent.click(input);
    await waitFor(() => userEvent.click(options[0]));
    expect(value).toBe(initProps.items[0].label);
  });

  test('should set proper placeholder', async () => {
    const placeholder = 'mockPlaceholder';
    const { value } = renderInput({ placeholder });
    expect(value).toBe(placeholder);
  });

  test('should set proper defaultValue', async () => {
    const defaultValue = initProps.items[0];
    const { value } = renderInput({ defaultValue: defaultValue.value });
    expect(value).toBe(defaultValue.label);
  });
});
