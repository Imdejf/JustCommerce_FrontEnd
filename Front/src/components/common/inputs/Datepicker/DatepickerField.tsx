import { useField } from "formik";
import { IInputProps, DateInterface } from "../inputTypes";
import Datepicker from "./DatepickerInput";

const DatepickerField: React.FC<DateInterface> = ({
  name,
  date,
  setDate,
  ...props
}) => {
  const [field] = useField(name);

  return <Datepicker date={date} setDate={setDate} {...props} {...field} />;
};

export default DatepickerField;
