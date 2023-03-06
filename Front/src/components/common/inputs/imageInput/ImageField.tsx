import { useField } from "formik";
import { ChangeEvent } from "react";
import { IInputProps } from "../inputTypes";
import ImageInput from "./ImageInput";

interface IImageFieldProps extends IInputProps {
  imgSrc?: string;
}

const ImageField: React.FC<IImageFieldProps> = ({
  name,
  // @ts-ignore
  setBase64,
  ...props
}) => {
  const [field, { error, touched }, { setTouched }] = useField(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    field.onChange(e);
  };

  return (
    <ImageInput
      {...field}
      {...props}
      // @ts-ignore
      setBase64={setBase64}
      onChange={handleChange}
      error={error}
      touched={touched}
    />
  );
};

export default ImageField;
