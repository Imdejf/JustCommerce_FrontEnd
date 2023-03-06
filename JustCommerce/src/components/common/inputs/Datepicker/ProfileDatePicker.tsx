import { useState } from "react";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";

import { IInputProps, DateInterface } from "../inputTypes";
import TextInput from "../textInput/TextInput";

import "react-datepicker/dist/react-datepicker.min.css";
// import * as locale from "date-fns/locale";
// const dafaultLang = "pl";
// const defaultLocale = locale[dafaultLang];
// registerLocale("pl", defaultLocale);
// setDefaultLocale("pl");

// console.dir(defaultLocale);

const ProfileDatePicker: React.FC<DateInterface> = ({
  date,
  setDate,
  ...props
}) => {
  return (
    <ReactDatePicker
      selected={date}
      closeOnScroll
      withPortal
      onChange={(date) => {
        if (!date) {
          return;
        }

        setDate(date as Date);
        if (props.onChange) {
          props.onChange({
            target: { value: date.toLocaleString(), name: props.name },
          });
        }
      }}
      dateFormat={"dd LLLL yyyy"}
      customInput={<TextInput {...props} />}
    />
  );
};

export default ProfileDatePicker;
