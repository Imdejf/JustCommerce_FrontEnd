import { useField } from 'formik';
import { IMaskedInputProps } from '../inputTypes';
import MaskedInput from './MaskedInput';

const MaskedField: React.FC<IMaskedInputProps> = ({ name, ...props }) => {
  const [field] = useField(name);
  return <MaskedInput {...props} {...field} />;
};

export default MaskedField;
