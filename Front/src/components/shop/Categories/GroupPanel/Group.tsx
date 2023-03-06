import { useFormikContext } from "formik";
import { useState } from "react";

import {
  ConditionTemplate,
  ConditionTemplateSubgroup,
} from "types/conditionTypes";

import { ReactComponent as Arrow } from "assets/icons/arrow.svg";

import GroupInput from "./GroupInput";
import IsPercentSelect from "./IsPercentSelect";
import Subgroups from "./Subgroups";

interface Props {
  groupIndex: number;
  groupName: string;
  subgroups: ConditionTemplateSubgroup[];
}

const Group = ({ groupIndex, groupName, subgroups }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { setFieldValue, values } = useFormikContext<ConditionTemplate>();

  const currentField = values.conditionsGroups[groupIndex];

  return (
    <>
      <thead className="border border-gray border-opacity-30 bg-gray bg-opacity-30 ">
        <tr>
          <th>
            <Arrow
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`transform cursor-pointer ${
                !isCollapsed ? "-rotate-90" : "rotate-90"
              }`}
            />
          </th>
          <th className="border border-gray border-opacity-30  ">
            {groupName}
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>

          <th></th>
        </tr>
      </thead>
      {!isCollapsed && (
        <tbody>
          {subgroups &&
            // @ts-ignore
            subgroups.map(({ Name, Position, CategoryId }, subGroupIndex) => (
              <Subgroups
                key={subGroupIndex + CategoryId}
                conditionsRows={Name}
                groupIndex={groupIndex}
                subGroupIndex={subGroupIndex}
              />
            ))}
        </tbody>
      )}
    </>
  );
};

export default Group;
