import cs from "classnames";
import { ChangeEvent, useState } from "react";
import { useField } from "formik";

import { IInputProps } from "../inputTypes";

import { ReactComponent as TrueIco } from "assets/icons/true.svg";
import { ReactComponent as FalseIco } from "assets/icons/false.svg";
import ErrorMessage from "../ErrorMessage";
import { useParams } from "react-router-dom";
import permissionsServices from "services/permissionsServices";
import { toast } from "react-toastify";
import notificationsServices from "services/notificationsServices";

const NotificationSwitch: React.FC<any> = ({
  className,
  label,
  name,
  onChange,
  checked,
  flagName,
  flagValue,
  domainName,
}) => {
  // const [field, { error, touched, value }, { setValue, setTouched }] =
  //   useField(name);
  const [isChecked, setChecked] = useState(checked);
  const { id } = useParams<{ id: string }>();

  const grantPermission = (UserId: string, PermissionFlagValue: number) => {
    notificationsServices.grantNotification(UserId, PermissionFlagValue);
  };

  const revokePermission = (UserId: string, PermissionFlagValue: number) => {
    notificationsServices.revokeNotification(UserId, PermissionFlagValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isChecked) {
      setChecked((prev: boolean) => !prev);
      revokePermission(id, flagValue);

      toast.success("Wyłączono powiadomienia!");
    } else {
      setChecked((prev: boolean) => !prev);

      grantPermission(id, flagValue);

      toast.success("Włączono powiadomienia!");
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-4 items-center h-10 justify-between">
        {label && (
          <label className="text-sm capitalize-first" htmlFor={name}>
            {label}
          </label>
        )}
        <label
          htmlFor={name}
          data-testid="switchContainer"
          className="cursor-pointer w-max"
        >
          <input
            data-testid="switchInput"
            className="hidden"
            type="checkbox"
            name={name}
            id={name}
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="flex relative items-center">
            <div className="relative w-8 h-4 bg-black border border-gray-light rounded user select-none" />
            <div
              className={cs(
                `absolute left-0
              flex justify-center items-center
              w-5 h-5 
              rounded border border-gray-light border-opacity-70 
              transition-all duration-150 transform 
              `,
                {
                  "bg-green translate-x-3": isChecked,
                  "bg-red ": !isChecked,
                },
              )}
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {isChecked ? (
                <TrueIco className="w-3 h-3" />
              ) : (
                <FalseIco className="w-2 h-2" />
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default NotificationSwitch;
