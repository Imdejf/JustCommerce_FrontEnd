export interface IStatus {
  label: string;
  color: string;
}

export interface IBoxProps {
  className?: string;
  children?: JSX.Element;
}

export interface IBasicBoxProps extends IBoxProps {
  title: string;
  subTitle?: string;
  icon: string;
  status: IStatus;
  type: string;
}
