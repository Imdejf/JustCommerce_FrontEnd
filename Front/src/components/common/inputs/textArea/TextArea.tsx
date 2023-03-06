import React from "react";
import cs from "classnames";

import Input from "../Input";
import { ITextareaProps } from "../inputTypes";

const TextArea: React.FC<ITextareaProps> = ({
  children,
  name,
  className = "",
  inputClassName = "",
  label,
  placeholder,
  style,
  wrapperClassname = "",
  value,
  ...props
}) => {
  const inputClassNames = cs(
    "flex-1 outline-none font-regular bg-white w-full",
    {
      [inputClassName]: inputClassName,
    },
  );

  return (
    <div style={{ position: "relative" }}>
      <Input
        name={name}
        label={label}
        render={() => (
          <textarea
            {...props}
            className={inputClassNames}
            id={name}
            placeholder={placeholder}
            value={value}
          />
        )}
        type="textarea"
        wrapperClassName={wrapperClassname}
        value={value}
      />

      <p
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "25px",
          // @ts-ignore
          color: value?.length > 700 ? "red" : "",
        }}
      >
        {/* @ts-ignore */}
        {value?.length} / 700
      </p>
    </div>
  );
};

export default TextArea;
