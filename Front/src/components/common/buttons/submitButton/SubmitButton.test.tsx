import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SubmitButton from './SubmitButton';

import { ISubmitButtonProps } from '../buttonTypes';

const initialProps: ISubmitButtonProps = {
  isSubmitting: false,
};

const renderButton = (props?: Partial<ISubmitButtonProps>) => {
  const utils = render(<SubmitButton {...initialProps} {...props} />);
  const button = utils.getByTestId('button');
  return { button, ...utils };
};

const onClick = jest.fn();

describe('SubmitButton component', () => {
  test('should render correctly', () => {
    const { button } = renderButton();
    expect(button).toBeInTheDocument();
  });

  test('should set proper default values', () => {
    const { button } = renderButton();
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('should set proper custom classname', () => {
    const customClassName = 'customClass';
    const { button } = renderButton({ className: customClassName });
    expect(button).toHaveClass(customClassName);
  });

  test('should set proper onClick callback', () => {
    const { button } = renderButton({ onClick });
    expect(onClick).toHaveBeenCalledTimes(0);
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should set proper children', () => {
    const childContent = 'TestChild';
    const { getByText } = renderButton({ children: <div>{childContent}</div> });
    const child = getByText(childContent);
    expect(child).toBeInTheDocument();
  });
});
