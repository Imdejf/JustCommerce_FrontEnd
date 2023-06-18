import { ChangeEvent, useEffect, useCallback, useState } from 'react';

import Button from 'components/common/buttons/basicButton/Button';
import SelectInput from 'components/common/inputs/select/Select';
import TextInput from 'components/common/inputs/textInput/TextInput';
import { ISelectOption } from 'components/common/inputs/inputTypes';

import salesChannelsService from 'services/salesChannelServices';
import { useFormikContext } from 'formik';
import { ISalesChannelRequest } from 'types/salesChannelTypes';

interface Props {
  disabled?: boolean;
  selectedGroup: number;
}

const CategorySelect: React.FC<Props> = ({ disabled }) => {
  const [isCreateMode, setMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [groups, setGroups] = useState<[] | Array<ISelectOption>>([]);

  const { initialValues, values, setFieldValue } = useFormikContext<ISalesChannelRequest>();

  const isDisabled = disabled || values.group == null;
  const placeholder = isDisabled ? 'Wybierz grupę' : '';

  const fetchSubGroups = useCallback(async () => {
    if (values.group == null) return;

    const respone = await salesChannelsService.getSubGroups(values.group);
    const newSubGroups = respone.map(({ name, id }) => ({ label: name, value: id }));
    setGroups(newSubGroups);
  }, [values.group]);

  const addSubGroup = async () => {
    if (values.group == null) return;

    const addedSubGroup = await salesChannelsService.addSubGroup(values.group, inputValue);
    setGroups((prev) => [...prev, { label: addedSubGroup.name, value: addedSubGroup.id }]);
    setInputValue('');
    setFieldValue('subgroupId', addedSubGroup.id);
    setMode(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (item: ISelectOption) => {
    setFieldValue('subgroupId', item.value);
  };

  useEffect(() => {
    fetchSubGroups();
  }, [fetchSubGroups]);

  useEffect(() => {
    setFieldValue('subgroupId', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.group]);

  return (
    <div>
      {isCreateMode ? (
        <>
          <TextInput name='name' label='Nowa kategoria' autoFocus value={inputValue} onChange={handleInputChange} />
          <div className='flex gap-x-2'>
            <Button onClick={addSubGroup}>Zatwierdź</Button>
            <Button className='text-red' onClick={() => setMode(false)}>
              Anuluj
            </Button>
          </div>
        </>
      ) : (
        <>
          <SelectInput
            name='subgroupId'
            placeholder={placeholder}
            label='Kategoria'
            disabled={isDisabled}
            items={groups}
            defaultValue={values.subgroupId || initialValues.subgroupId}
            onChange={handleSelectChange}
          />
          <Button disabled={isDisabled} onClick={() => setMode(true)}>
            Dodaj nową
          </Button>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
