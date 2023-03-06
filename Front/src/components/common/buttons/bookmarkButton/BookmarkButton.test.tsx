import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BookmarkButton from './BookmarkButton';

import { Directions, IBookmarkButtonProps } from '../buttonTypes';

const initialProps: IBookmarkButtonProps = {
  direction: Directions.Up,
};

const renderButton = (props?: Partial<IBookmarkButtonProps>) => {
  const utils = render(<BookmarkButton {...initialProps} {...props} />);
  const button = utils.getByTestId('button');
  return { button, ...utils };
};

const onClick = jest.fn();

describe('BookmarkButton component', () => {
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

  test('should set proper direction', () => {
    const { button, rerender } = renderButton();
    rerender(<BookmarkButton direction={Directions.Up} />);
    expect(button).toHaveClass('rounded-t-none');

    rerender(<BookmarkButton direction={Directions.Down} />);
    expect(button).toHaveClass('rounded-b-none');

    rerender(<BookmarkButton direction={Directions.Right} />);
    expect(button).toHaveClass('rounded-r-none');

    rerender(<BookmarkButton direction={Directions.Left} />);
    expect(button).toHaveClass('rounded-l-none');
  });
});
