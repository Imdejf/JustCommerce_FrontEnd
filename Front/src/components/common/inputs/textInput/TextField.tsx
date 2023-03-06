import { useField } from 'formik';
import { IInputProps } from '../inputTypes';
import TextInput from './TextInput';

const TextField: React.FC<IInputProps> = ({ name, ...props }) => {
  const [field, { error, touched }] = useField(name);

  return <TextInput {...props} {...field} error={error} touched={touched} />;
};

export default TextField;
