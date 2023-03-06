import { useFormikContext } from 'formik';

import { ConditionTemplate, ConditionTemplateSalesChannel } from 'types/conditionTypes';

import GroupInput from './GroupInput';
import IsPercentSelect from './IsPercentSelect';

type Props = {
  groupIndex: number;
  subGroupIndex: number;
  rows: ConditionTemplateSalesChannel[];
};

const SalesChannelRows = ({ groupIndex, subGroupIndex, rows }: Props) => {
  const { setFieldValue, values } = useFormikContext<ConditionTemplate>();
  return (
    <>
      {rows.map(({ value, salesChannel, id, isValuePercentage }, rowIndex) => {
        const currentField =
          values.conditionsGroups[groupIndex].conditionsSubgroups[subGroupIndex].conditionsRows[rowIndex];

        return (
          <tr key={rowIndex + id}>
            <td></td>
            <td></td>
            <td className='border border-gray border-opacity-30 border-r-0'></td>
            <td className='border border-gray border-opacity-30 border-l-0 border-r-0 '></td>
            <td className='border border-gray border-opacity-30 border-l-0 '>{salesChannel.name} </td>
            <td className='border border-gray border-opacity-30'>
              <div className='flex'>
                <GroupInput
                  isPercent={currentField.isValuePercentage}
                  value={currentField.value}
                  onChange={(value) => {
                    setFieldValue(
                      `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].value`,
                      value
                    );
                  }}
                />
              </div>
            </td>
            <td className='border border-gray border-opacity-30'>
              <IsPercentSelect
                name={`conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].isValuePercentage`}
                value={currentField.isValuePercentage}
                onChange={({ value }) => {
                  setFieldValue(
                    `conditionsGroups[${groupIndex}].conditionsSubgroups[${subGroupIndex}].conditionsRows[${rowIndex}].isValuePercentage`,
                    value
                  );
                }}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default SalesChannelRows;
