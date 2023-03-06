import cs from 'classnames';

import Button from '../basicButton/Button';

import { ButtonVariant, ISubmitButtonProps } from '../buttonTypes';

const SubmitButton: React.FC<ISubmitButtonProps> = ({
  children,
  className = '',
  disabled,
  isSubmitting,
  ...props
}) => {
  const classNames = cs('py-8 px-36 mt-6 text-sm rounded-sm opacity-90 w-max', {
    'text-opacity-30 shadow-none cursor-not-allowed': disabled,
    [className]: className,
  });
  return (
    <Button
      disabled={disabled || isSubmitting}
      className={classNames}
      variant={ButtonVariant.Submit}
      type='submit'
      {...props}
    >
      {isSubmitting ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
