import cs from 'classnames';
import Button from '../basicButton/Button';
import { IBookmarkButtonProps, Directions } from '../buttonTypes';

const BookmarkButton: React.FC<IBookmarkButtonProps> = ({ className = '', direction = Directions.Up, ...props }) => {
  const btnClasses = cs('border-none bg-white rounded shadow-md', {
    'rounded-t-none': direction === Directions.Up,
    'rounded-b-none': direction === Directions.Down,
    'rounded-r-none': direction === Directions.Right,
    'rounded-l-none': direction === Directions.Left,
    [className]: className,
  });

  return <Button className={btnClasses} {...props} />;
};

export default BookmarkButton;
