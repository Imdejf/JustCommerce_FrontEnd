import cs from 'classnames';
import { IBoxProps } from './boxTypes';

const Box: React.FC<IBoxProps> = ({ className = '', children }) => {
  const classNames = cs('flex bg-white bg-opacity-70 rounded shadow-md', {
    [className]: className,
  });
  return <div className={classNames}>{children}</div>;
};

export default Box;
