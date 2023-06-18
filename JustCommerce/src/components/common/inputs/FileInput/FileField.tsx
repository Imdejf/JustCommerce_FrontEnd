import { useField } from 'formik';
import { ChangeEvent } from 'react';
import { IInputProps } from '../inputTypes';
import FileInput from './FileInput';

interface IFileFieldProps extends IInputProps {
  imgSrc?: string;
}

const FileField: React.FC<IFileFieldProps> = ({ name, ...props }) => {
  const [field, { error, touched }, { setTouched }] = useField(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    field.onChange(e);
  };

  return (
    <FileInput {...props} {...field} onChange={handleChange} error={error} touched={touched} />
  );
};

export default FileField;
