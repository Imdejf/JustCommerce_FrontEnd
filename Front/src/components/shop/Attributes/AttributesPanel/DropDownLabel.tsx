import React, { useState } from "react";
import { ReactComponent as Arrow } from "../../../../assets/icons/arrow.svg";
import cs from "classnames";

import styled from "styled-components";
import DropDownOption from "./DropDownOption";

function DropDownLabel({ label, items }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const arrowClassNames = cs("h-5 w-5 transform duration-200 select-none", {
    "rotate-90": isExpanded,
    "-rotate-90": !isExpanded,
  });

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
  return (
    <>
      <DropdownPanel onClick={handleToggle}>
        <DropdownPanelTop className="bg-white  px-18 py-12">
          <Label>{label}</Label>

          <Arrow className={arrowClassNames} />
        </DropdownPanelTop>
        {isExpanded && (
          <div onClick={(e) => e.stopPropagation()}>
            {items.Values.map((item: any) => {
              return (
                <DropDownOption label={item.Name} item={item}></DropDownOption>
              );
            })}
          </div>
        )}
      </DropdownPanel>
    </>
  );
}

export default DropDownLabel;

const DropdownPanel = styled.div`
  margin-top: 20px;
`;
const DropdownPanelTop = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
`;
const Label = styled.p`
  /* opacity: 0.7; */
`;
