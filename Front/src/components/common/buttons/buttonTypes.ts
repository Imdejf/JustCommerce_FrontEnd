import { ButtonHTMLAttributes } from 'react';

export enum ButtonVariant {
  Normal,
  Submit,
  Abort,
  Remove,
}

export enum Directions {
  Up,
  Down,
  Left,
  Right,
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any;
  className?: string;
  size?: number;
  variant?: ButtonVariant;
}

export interface IBookmarkButtonProps extends IButtonProps {
  direction: Directions;
}

export interface ISubmitButtonProps extends IButtonProps {
  isSubmitting: boolean;
}

export const ButtonVariantArgType = {
  name: 'Variant',
  control: {
    type: 'radio',
  },
  options: ['Normal', 'Submit', 'Abort'],
  mapping: {
    Normal: ButtonVariant.Normal,
    Submit: ButtonVariant.Submit,
    Abort: ButtonVariant.Abort,
  },
};
