import Switch from "./Switch";
import { IInputProps } from "../inputTypes";
import PermissionSwitch from "./PermissionSwitch";

export interface ISwitchBlockProps extends IInputProps {
  label: string;
  name: string;
  checked: boolean;
  domainName: string;
  flagName: string;
  flagValue: number;
}

const SwitchBlock: React.FC<ISwitchBlockProps> = ({
  label,
  name,
  className = "",
  checked,
  domainName,
  flagName,
  flagValue,
  ...props
}) => {
  return (
    <div className={`flex gap-4 items-center justify-between ${className}`}>
      <span>{label}</span>
      <PermissionSwitch
        domainName={domainName}
        flagValue={flagValue}
        flagName={flagName}
        checked={checked}
        name={name}
        {...props}
      />
    </div>
  );
};

export default SwitchBlock;
