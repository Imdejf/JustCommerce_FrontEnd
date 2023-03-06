import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

import { ButtonVariant, IButtonProps } from '../buttonTypes';

const renderButton = (props?: IButtonProps) => {
  const utils = render(<Button {...props} />);
  const button = utils.getByTestId('button');
  return { button, ...utils };
};

const onClick = jest.fn();

describe('Button component', () => {
  test('should render correctly', () => {
    const { button } = renderButton();
    expect(button).toBeInTheDocument();
  });

  test('should set proper default values', () => {
    const { button } = renderButton();
    expect(button).toHaveClass('bg-white');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
  });

  test('should set proper disabled value', () => {
    const { button } = renderButton({ disabled: true });
    expect(button).toBeDisabled();
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

  test('should set proper variant', () => {
    const { button, rerender } = renderButton();
    rerender(<Button variant={ButtonVariant.Normal} />);
    expect(button).toHaveClass('bg-white');

    rerender(<Button variant={ButtonVariant.Submit} />);
    expect(button).toHaveClass('bg-green-light');

    rerender(<Button variant={ButtonVariant.Abort} />);
    expect(button).toHaveClass('bg-lightred');

    rerender(<Button variant={ButtonVariant.Remove} />);
    expect(button).toHaveClass('bg-lightred');
  });
});
