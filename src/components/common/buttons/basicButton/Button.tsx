import cs from 'classnames';
import { ButtonVariant, IButtonProps } from '../buttonTypes';

const Button = ({
  className = '',
  children,
  disabled = false,
  size,
  type = 'button',
  variant = ButtonVariant.Normal,
  onClick,
  ...props
}: IButtonProps) => {
  const classNames = cs('button', {
    'button--normal': variant === ButtonVariant.Normal,
    'button--submit': variant === ButtonVariant.Submit,
    'button--abort': [ButtonVariant.Abort, ButtonVariant.Remove].includes(variant),
    'button--disabled': disabled,
    [className]: className,
  });
  return (
    <button {...props} className={classNames} disabled={disabled} onClick={onClick} type={type} data-testid='button'>
      {children}
    </button>
  );
};

export default Button;
