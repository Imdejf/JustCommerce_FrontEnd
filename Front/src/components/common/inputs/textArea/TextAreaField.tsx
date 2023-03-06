import { useField } from 'formik';
import { ITextareaProps } from '../inputTypes';
import TextArea from './TextArea';

const TextAreaField: React.FC<ITextareaProps> = ({ name, ...props }) => {
  const [field, { error, touched }] = useField(name);
  return <TextArea {...props} {...field} error={error} touched={touched} />;
};

export default TextAreaField;
