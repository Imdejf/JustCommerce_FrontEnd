import { useCallback, useEffect, useState } from 'react';

import SelectInput from 'components/common/inputs/select/Select';
import { ISelectOption } from 'components/common/inputs/inputTypes';

import salesChannelsService from 'services/salesChannelServices';
import { useFormikContext } from 'formik';
import { ISalesChannel } from 'types/salesChannelTypes';

const GroupSelect: React.FC = () => {
  const [groups, setGroups] = useState<[] | Array<ISelectOption>>([]);

  const { initialValues, setFieldValue } = useFormikContext<ISalesChannel>();

  const fetchGroups = async () => {
    const response = await salesChannelsService.getGroups();
    const newGroups = response.map((group) => ({ label: group.flagName, value: group.flagValue }));
    setGroups(newGroups);
  };

  const handleInputChange = useCallback((item: ISelectOption) => {
    setFieldValue('group', item.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <SelectInput
      name='group'
      label='Grupa'
      defaultValue={initialValues.group}
      items={groups}
      onChange={handleInputChange}
    />
  );
};

export default GroupSelect;
