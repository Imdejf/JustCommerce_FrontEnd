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
          {/* <th className='border-l border-gray border-opacity-30  '>
            <div className='flex'>
              <GroupInput
                isPercent={currentField.isValuePercentage}
                value={`${currentField.defaultChildsValue}`}
                onChange={(value) => {
                  setFieldValue(`conditionsGroups.${groupIndex}.defaultChildsValue`, value);

                  currentField.conditionsSubgroups.forEach((sub, subIdx) => {
                    setFieldValue(
                      `conditionsGroups.${groupIndex}.conditionsSubgroups.${subIdx}.defaultChildsValue`,
                      value
                    );
                    setFieldValue(
                      `conditionsGroups.${groupIndex}.conditionsSubgroups.${subIdx}.isValuePercentage`,
                      currentField.isValuePercentage
                    );

                    sub.conditionsRows.forEach((row, rowIndex) => {
                      setFieldValue(
                        `conditionsGroups[${groupIndex}].conditionsSubgroups[${subIdx}].conditionsRows[${rowIndex}].value`,
                        value
                      );
                      setFieldValue(
                        `conditionsGroups[${groupIndex}].conditionsSubgroups[${subIdx}].conditionsRows[${rowIndex}].isValuePercentage`,
                        currentField.isValuePercentage
                      );
                    });
                  });
                }}
              />
            </div>
          </th> */}
          <th>
            {/* <IsPercentSelect
              name={`conditionsGroups[${groupIndex}].isValuePercentage`}
              value={currentField.isValuePercentage}
              onChange={({ value }) => {
                setFieldValue(
                  `conditionsGroups.${groupIndex}.isValuePercentage`,
                  value
                );

                currentField.conditionsSubgroups.forEach((sub, subIdx) => {
                  setFieldValue(
                    `conditionsGroups.${groupIndex}.conditionsSubgroups.${subIdx}.isValuePercentage`,
                    value
                  );

                  sub.conditionsRows.forEach((row, rowIndex) => {
                    setFieldValue(
                      `conditionsGroups[${groupIndex}].conditionsSubgroups[${subIdx}].conditionsRows[${rowIndex}].isValuePercentage`,
                      value
                    );
                  });
                });
              }}
            /> */}
          </th>
        </tr>
      </thead>
      {!isCollapsed && (
        <tbody>
          {/* @ts-ignore */}
          {subgroups.map(({ Name, Position, ValueId }, subGroupIndex) => (
            <Subgroups
              key={subGroupIndex + ValueId}
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
