import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputSearch, { ISearchInputProps } from './InputSearch';

const name = 'searchInput';
const query = 'SearchQuery';
const debounceTime = 100;
const onChange = jest.fn();
const onBlur = jest.fn();
const onFocus = jest.fn();

const renderBox = (props?: ISearchInputProps) => {
  const utils = render(<InputSearch name={name} debounceTime={debounceTime} {...props} />);
  const input = utils.getByTestId(name);
  return { input, ...utils };
};

afterEach(() => {
  onChange.mockReset();
  onBlur.mockReset();
  onFocus.mockReset();
});

describe('SearchInput component', () => {
  test('should render correctly', () => {
    const { input } = renderBox();
    expect(input).toBeInTheDocument();
  });

  test('should set proper value', async () => {
    const { input } = renderBox({ onChange, name });
    const expectValue = { target: { name, value: query } };
    userEvent.type(input, query);
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expectValue);
        expect(input).toHaveDisplayValue(expectValue.target.value);
      },
      {
        timeout: debounceTime + 100,
      }
    );
  });

  test('should set proper debounce value', async () => {
    const { input } = renderBox({ onChange, name });
    const expectValue = { target: { name, value: query } };
    userEvent.type(input, query);
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledTimes(0);
        expect(input).toHaveDisplayValue(query);
      },
      {
        timeout: 0,
      }
    );

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(expectValue);
        expect(input).toHaveDisplayValue(query);
      },
      {
        timeout: debounceTime + 100,
      }
    );
  });

  test('should set active class on focus', async () => {
    const { input, getByTestId } = renderBox();
    const wrapper = getByTestId('searchInputWrapper');

    const activeClassnames = 'border border-blue-light shadow-lg';

    expect(input).not.toHaveFocus();
    expect(wrapper).not.toHaveClass(activeClassnames);

    userEvent.click(input);

    expect(input).toHaveFocus();
    expect(wrapper).toHaveClass(activeClassnames);
  });

  test('should fired focus and blur callbacks properly', async () => {
    const { input } = renderBox({ onBlur, onFocus, name });

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(0);

    fireEvent.blur(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
