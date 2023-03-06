import Input from "../Input";

import { IInputProps } from "../inputTypes";
import StatisticsInput from "../StatisticsInput";

const StatisticsTextInput: React.FC<IInputProps> = (props) => {
  return (
    <StatisticsInput
      {...props}
      render={(inputProps) => <input {...inputProps} />}
    />
  );
};

export default StatisticsTextInput;
