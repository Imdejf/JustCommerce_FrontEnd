import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export enum InputVariants {
  Normal,
  Inline,
}

export enum SwitchSize {
  Small = 1,
  Normal,
  Large,
  Flex,
}

interface IExternalInputProps {
  className?: string;
  error?: string;
  helperText?: string;
  isBlocked?: boolean;
  label?: string;
  name: string;
  showErrors?: boolean;
  touched?: boolean;
}

export interface IInputProps
  extends IExternalInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  showErrors?: boolean;
  type?:
    | "text"
    | "textarea"
    | "select"
    | "number"
    | "password"
    | "time"
    | "date";
  wrapperClassName?: string;
  variant?: InputVariants;
  onChange?: (e: any) => void;
}

export interface DateInterface
  extends IExternalInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  showErrors?: boolean;
  type?:
    | "text"
    | "textarea"
    | "select"
    | "number"
    | "password"
    | "time"
    | "date";
  wrapperClassName?: string;
  variant?: InputVariants;
  date: any;
  setDate: any;
  onChange?: (e: any) => void;
}

export interface ITextareaProps
  extends IExternalInputProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  inputClassName?: string;
  wrapperClassname?: string;
}

export interface ISelectOption<T = any> {
  label: string;
  value: T;
}

export interface SelectOptionInterface {
  Name: string;
  Position: number;
  File: any;
  Id: string;
  Description: string;
}

export interface SelectPropsInterface extends IInputProps {
  onlyPickValue?: boolean;
  defaultValue?: any;
  items: Array<SelectOptionInterface>;
  isSearchable?: boolean;
  optionClassName?: string;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<SelectOptionInterface | null>
  >;
  selectedItem: SelectOptionInterface | null;
}

export interface ISelectProps extends IInputProps {
  onlyPickValue?: boolean;
  defaultValue?: any;
  items: Array<ISelectOption>;
  isSearchable?: boolean;
  optionClassName?: string;
}

export interface SelectProfilesInterface extends IInputProps {
  onlyPickValue?: boolean;
  defaultValue?: any;
  items: Array<ISelectOption>;
  isSearchable?: boolean;
  optionClassName?: string;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{ label: string; value: number } | null>
  >;
  selectedItem: { label: string; value: number } | null;
}

export interface IMaskedInputProps extends IInputProps {
  mask: string;
}

export interface ISwitchProps extends IInputProps {
  size: SwitchSize;
}

export enum DragStatus {
  none,
  over,
}
