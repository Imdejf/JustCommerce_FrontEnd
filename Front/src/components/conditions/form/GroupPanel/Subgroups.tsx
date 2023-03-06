import { useFormikContext } from 'formik';
import { useState } from 'react';

import { ConditionTemplate, ConditionTemplateSalesChannel } from 'types/conditionTypes';
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg';

import GroupInput from './GroupInput';
import IsPercentSelect from './IsPercentSelect';
import SalesChannelRows from './SalesChannelRows';

type Props = {
  groupIndex: number;
  subGroupIndex: number;
  conditionsRows: ConditionTemplateSalesChannel[];
};

const Subgroups = ({ groupIndex, subGroupIndex, conditionsRows }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { setFieldValue, values } = useFormikContext<ConditionTemplate>();
  const currentField = values.conditionsGroups[groupIndex].conditionsSubgroups[subGroupIndex];

  return (
    <>
      <tr>
        <td></td>
        <td></td>
        <td className='border border-gray border-opacity-30 bg-gray bg-opacity-10'>
          <Arrow
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`transform cursor-pointer ${!isCollapsed ? '-rotate-90' : 'rotate-90'}`}
          />
        </td>
        <td colSpan={2} className='border border-gray border-opacity-30 bg-gray bg-opacity-10'>
          {currentField.subgroupDTO.name}
        </td>
        <td className='border border-gray border-opacity-30 bg-gray bg-opacity-10'>
          <div className='flex'>
            <GroupInput
              isPercent={currentField.isValuePercentage}
              value={currentField.defaultChildsValue}
              onChange={(value) => {
                setFieldValue(
                  `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].defaultChildsValue`,
                  value
                );

                currentField.conditionsRows.forEach((row, rowIndex) => {
                  setFieldValue(
                    `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].value`,
                    value
                  );
                  setFieldValue(
                    `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].isValuePercentage`,
                    currentField.isValuePercentage
                  );
                });
              }}
            />
          </div>
        </td>
        <td className='border border-gray border-opacity-30 bg-gray bg-opacity-10'>
          <IsPercentSelect
            name={`conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].isValuePercentage`}
            value={currentField.isValuePercentage}
            onChange={({ value }) => {
              setFieldValue(
                `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].isValuePercentage`,
                value
              );

              currentField.conditionsRows.forEach((row, rowIndex) => {
                setFieldValue(
                  `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].isValuePercentage`,
                  value
                );
              });
            }}
          />
        </td>
      </tr>
      {!isCollapsed && <SalesChannelRows rows={conditionsRows} groupIndex={groupIndex} subGroupIndex={subGroupIndex} />}
    </>
  );
};

export default Subgroups;
