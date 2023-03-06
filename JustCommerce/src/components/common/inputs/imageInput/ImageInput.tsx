import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import cs from "classnames";

import Button from "../../buttons/basicButton/Button";
import DragOverlay from "../FileInput/DragOverlay";

import { convertToBase64, getImageSize } from "../../../../utils/fileUtils";
import { useDragAndDrop } from "../../../../hooks/useDragAndDrop";
import { IInputProps } from "../inputTypes";

import ErrorMessage from "../ErrorMessage";
import AddImagePlaceholder from "./AddImagePlaceholder";

interface IImageInputProps extends IInputProps {
  imgSrc?: string;
  placeholder?: string;
  showButtons?: boolean;
  withRemoveIcon?: boolean;
}

const ImageInput: React.FC<IImageInputProps> = ({
  className = "",
  disabled,
  error,
  imgSrc,
  name,
  placeholder,
  showButtons,
  touched,
  withRemoveIcon,
  onChange,
  // @ts-ignore
  setBase64,
  ...props
}) => {
  const [previewSrc, setPreviewSrc] = useState("");
  const { dragStatus, ...inputHandlers } = useDragAndDrop();

  const labelRef = useRef<HTMLLabelElement>(null);

  const showError = Boolean(touched && error);

  const openFileDialog = () => {
    if (!labelRef?.current) return;
    labelRef.current.click();
  };

  const removeFile = () => {
    setPreviewSrc("");

    if (onChange) {
      onChange({
        target: {
          name,
          value: {
           
            Base64String: "",
           
          },
        },
      });
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;

    if (files?.length) {
      try {
        const file = files[0];
        const { base64String } = await convertToBase64(file);
        const imgPath = URL.createObjectURL(file);
        const sizes = await getImageSize(imgPath);
        setBase64(base64String);
        setPreviewSrc(imgPath);

        if (onChange) {
          onChange({
            target: {
              name,
              value: {
             
                Base64String:base64String,
              
              },
            },
          });
        }
      } catch (error: any) {
        toast.error(`Image upload error: ${error}`);
      }
    }
  };

  useEffect(() => {
    if (!previewSrc && imgSrc) {
      setPreviewSrc(imgSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]);

  const classNames = cs(
    "flex flex-col items-center justify-center relative w-60 h-60",
    {
      [className]: className,
    }
  );
  return (
    <div className={classNames}>
      {withRemoveIcon && (previewSrc || imgSrc) && (
        <button
          className="absolute top-2 right-2 z-20 w-7 h-7 
          bg-white opacity-70 
          border border-gray-light border-opacity-40 
          shadow rounded-sm  
          transition-opacity duration-150 hover:opacity-100  hover:border-opacity-70 "
          onClick={removeFile}
        >
          <span className="material-icons-outlined opacity-50">delete</span>
        </button>
      )}
      <label
        htmlFor={name}
        ref={labelRef}
        className="rounded relative overflow-hidden border border-gray border-opacity-80 w-full h-full"
      >
        {!disabled && (
          <>
            <DragOverlay dragStatus={dragStatus} />
            <input
              type="file"
              name={name}
              id={name}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              {...inputHandlers}
            />
          </>
        )}
        {previewSrc || imgSrc ? (
          <img
            src={previewSrc}
            alt=""
            className="block object-cover w-full h-full"
          />
        ) : (
          placeholder || <AddImagePlaceholder />
        )}
      </label>
      {error && <ErrorMessage message={error} show={showError} />}

      {!disabled && showButtons && (
        <div className="flex gap-x-4">
          <Button onClick={openFileDialog} className=" mt-4 px-18 rounded-sm">
            {!imgSrc ? `Dodaj zdjęcie` : `Zmień zdjęcie`}
          </Button>
          {imgSrc && (
            <Button onClick={removeFile} className=" mt-4 px-18 rounded-sm">
              Usuń zdjęcie
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
