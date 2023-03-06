import { useState, FocusEvent, ChangeEvent, useEffect } from 'react';
import cs from 'classnames';

import { IInputProps } from '../inputTypes';

import { ReactComponent as Magnifier } from '../../../../assets/icons/magnifier.svg';

export interface ISearchInputProps extends IInputProps {
  debounceTime?: number;
}

const InputSearch = ({
  name,
  className = '',
  debounceTime = 1000,
  defaultValue = '',
  onBlur,
  onChange,
  onFocus,
  placeholder = '',
  style = {},
  type = 'text',
  ...props
}: ISearchInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: newValue } = e.target;
    setValue(newValue);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsActive(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsActive(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  useEffect(() => {
    const debounce = window.setTimeout(() => {
      if (onChange) {
        onChange({ target: { value, name } });
      }
    }, debounceTime);

    return () => {
      clearTimeout(debounce);
    };
  }, [debounceTime, name, onChange, value]);

  const inputClasses = cs(
    'flex border border-opacity-20 rounded-full text-sm font-sm overflow-hidden bg-white py-4 px-18 transition duration-200 relative',
    {
      'border-blue-light shadow-lg border-opacity-60': isActive,
      'border-gray-light': !isActive,
      [className]: className,
    }
  );

  return (
    <div data-testid='searchInputWrapper' className={inputClasses}>
      <input
        data-testid='searchInput'
        type={type}
        value={value}
        placeholder={placeholder}
        className='flex-1 outline-none leading-none bg-white py-8 '
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <div className='flex items-center opacity-70'>
        <Magnifier />
      </div>
    </div>
  );
};

export default InputSearch;
