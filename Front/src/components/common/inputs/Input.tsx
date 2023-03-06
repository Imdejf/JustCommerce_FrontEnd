import React from 'react';
import cs from 'classnames';

import { IInputProps } from './inputTypes';
import InputBlockOverlay from './InputOverlays/InputBlockOverlay';
import ErrorMessage from './ErrorMessage';
import InputOutline from './InputOutline';

interface IInputWrapperProps extends IInputProps {
  render: React.FC<IInputProps>;
}

const Input: React.FC<IInputWrapperProps> = ({
  children,
  error,
  helperText = '',
  isBlocked = false,
  label,
  showErrors = true,
  wrapperClassName = '',
  render,
  ...props
}) => {
  const { className = '', name, style, touched = true, value, type } = props;

  const showErrorMessage = Boolean(touched && error);

  const inputContainerClasses = cs('formControl', {
    'formControl--hasValue': !!value,
    'formControl--hasError': error && touched,
    [`formControl--${type}`]: type,
    [className]: className,
  });

  return (
    <div style={{ ...style }} className={`relative flex-1 md:flex-none ${wrapperClassName}`}>
      <div className={inputContainerClasses}>
        <InputBlockOverlay show={isBlocked} />
        <InputOutline label={label} name={name} />
        {render({ ...props, id: name })}
      </div>

      {showErrors && <ErrorMessage helperText={helperText} message={error} show={showErrorMessage} />}
    </div>
  );
};

export default Input;
