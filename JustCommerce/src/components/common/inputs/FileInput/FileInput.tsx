import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '../Input';

import { IInputProps, InputVariants } from '../inputTypes';
import { convertToBase64 } from '../../../../utils/fileUtils';
import DragOverlay from './DragOverlay';
import { useDragAndDrop } from '../../../../hooks/useDragAndDrop';
import { IFile } from 'types/globalTypes';

interface IFileInputProps extends Omit<IInputProps, 'value'> {
  imgSrc?: string;
  error?: string;
  touched?: boolean;
  inputClassName?: string;
  value?: IFile | null;
}

const FileInput: React.FC<IFileInputProps> = ({
  accept = '*',
  className = '',
  name,
  label,
  inputClassName = '',
  onChange,
  placeholder = '',
  variant = InputVariants.Inline,
  value,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { dragStatus, ...inputHandlers } = useDragAndDrop();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;

    if (files?.length) {
      try {
        const file = files[0];
        const { base64String } = await convertToBase64(file);   
        const filePath = URL.createObjectURL(file);
        setFile(file);

        if (onChange) {
          onChange({
            target: {
              name,
              value: {
                file,
                base64String,
                path: filePath,
              },
            },
          });
        }
      } catch (error: any) {
        toast.error(`File upload error: ${error}`);
      }
    }
  };

  useEffect(() => {
    setFile(value?.file || null);
  }, [value]);

  return (
    <Input
      onChange={handleFileChange}
      name={name}
      label={label}
      {...props}
      value={file?.name || placeholder}
      render={(inputProps) => (
        <div className={`flex items-center px-24 h-10 text-xs ${file ? 'justify-start' : 'justify-end'}`}>
          <DragOverlay dragStatus={dragStatus} />
          <input
            accept={accept}
            className='opacity-0 inset-0 absolute'
            type='file'
            name={name}
            id={name}
            onChange={handleFileChange}
            {...inputHandlers}
          />
          <span className='pointer-events-none'>{file?.name || <span className='opacity-60'>{placeholder}</span>}</span>
        </div>
      )}
    />
  );
};

export default FileInput;
