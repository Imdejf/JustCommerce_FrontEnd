import Input from '../Input';

import { IInputProps } from '../inputTypes';

const TextInput: React.FC<IInputProps> = (props) => {
  return <Input {...props} render={(inputProps) => <input {...inputProps} />} />;
};

export default TextInput;
