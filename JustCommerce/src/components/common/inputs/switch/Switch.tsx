import cs from "classnames";
import { ChangeEvent } from "react";
import { useField } from "formik";

import { IInputProps } from "../inputTypes";

import { ReactComponent as TrueIco } from "assets/icons/true.svg";
import { ReactComponent as FalseIco } from "assets/icons/false.svg";
import ErrorMessage from "../ErrorMessage";

const Switch: React.FC<any> = ({
  className,
  label,
  name,
  onChange,
  checked,
}) => {
  const [field, { error, touched, value }, { setValue, setTouched }] =
    useField(name);

  const showError = !!error && touched;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setValue({ ...value, checked: checked });
    field.onChange(name);
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value: { ...value, checked: checked } },
      });
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-4 items-center h-10 justify-between">
        {label && (
          <label className="text-sm capitalize-first" htmlFor={name}>
            {label}
          </label>
        )}
        <label
          htmlFor={name}
          data-testid="switchContainer"
          className="cursor-pointer w-max"
        >
          <input
            {...field}
            data-testid="switchInput"
            className="hidden"
            type="checkbox"
            name={name}
            id={name}
            checked={checked}
            onChange={handleChange}
          />
          <div className="flex relative items-center">
            <div className="relative w-8 h-4 bg-black border border-gray-light rounded user select-none" />
            <div
              className={cs(
                `absolute left-0
              flex justify-center items-center
              w-5 h-5 
              rounded border border-gray-light border-opacity-70 
              transition-all duration-150 transform 
              `,
                {
                  "bg-green translate-x-3": checked,
                  "bg-red ": !checked,
                },
              )}
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {checked ? (
                <TrueIco className="w-3 h-3" />
              ) : (
                <FalseIco className="w-2 h-2" />
              )}
            </div>
          </div>
        </label>
      </div>
      <ErrorMessage message={error} show={showError} />
    </div>
  );
};

export default Switch;
