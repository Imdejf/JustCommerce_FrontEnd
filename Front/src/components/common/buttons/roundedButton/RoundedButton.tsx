import cs from 'classnames';

import Button from '../basicButton/Button';

import { IButtonProps } from '../buttonTypes';

const RoundedButton: React.FC<IButtonProps> = ({ children, className = '', ...props }) => {
  const classNames = cs('rounded-full border border-gray-light shadow-none hover:shadow-none', {
    [className]: className,
  });
  return (
    <Button {...props} className={classNames}>
      {children}
    </Button>
  );
};

export default RoundedButton;
