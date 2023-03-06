import { useState } from "react";
import cs from "classnames";

import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import PanelButtons from "./PanelButtons";

interface IDropdownProps {
  canAdd?: boolean;
  canEdit?: boolean;
  canSave?: boolean;
  label: string;
  initialExpanded?: boolean;
  editable?: boolean;
  hasChanged?: boolean;
  render?: (props: { mode: Modes }) => JSX.Element;
  onSubmit?: () => void;
  onClear?: () => void;
  key?: any;
}

export enum Modes {
  Edit,
  View,
}

const DropdownPanel: React.FC<IDropdownProps> = ({
  canAdd = true,
  canEdit = true,
  canSave = true,
  label,
  initialExpanded = false,
  children,
  editable,
  hasChanged,
  onSubmit,
  onClear,
  render,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [mode, setMode] = useState(Modes.View);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleToggle = () => {
    if (!isExpanded) {
      handleExpand();
    } else {
      handleCollapse();
    }
  };

  const arrowClassNames = cs("h-5 w-5 transform duration-200 select-none", {
    "rotate-90": isExpanded,
    "-rotate-90": !isExpanded,
  });

  const listClassNames = cs(
    "bg-white bg-opacity-20 inline-flex px-18 gap-3 w-full",
    {
      hidden: !isExpanded,
    },
  );

  return (
    <div className="w-full">
      <div
        className="flex items-center bg-white bg-opacity-50 py-12 px-18 cursor-pointer text-sm text-black text-opacity-70"
        onClick={handleToggle}
      >
        <h6 className="flex-1">{label}</h6>
        {isExpanded && (
          <PanelButtons
            canAdd={canAdd}
            canEdit={canEdit}
            canSave={canSave}
            editable={editable}
            setMode={setMode}
            onSubmit={onSubmit}
            onClear={onClear}
            hasChanged={hasChanged}
            selectedMode={mode}
          />
        )}
        <Arrow className={arrowClassNames} />
      </div>
      <div className={listClassNames}>
        {render ? render({ mode }) : children}
      </div>
    </div>
  );
};

export default DropdownPanel;
