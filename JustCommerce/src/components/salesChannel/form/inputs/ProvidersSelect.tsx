import { useCallback, useEffect, useState } from 'react';

import SelectInput from 'components/common/inputs/select/Select';

import salesChannelsService from 'services/salesChannelServices';
import { ISelectOption } from 'components/common/inputs/inputTypes';
import { ISalesChannelRequest } from 'types/salesChannelTypes';
import { useFormikContext } from 'formik';

const ProvidersSelect: React.FC = () => {
  const [providers, setProviders] = useState<[] | Array<ISelectOption>>([]);

  const { initialValues, setFieldValue } = useFormikContext<ISalesChannelRequest>();

  const fetchProviders = async () => {
    const response = await salesChannelsService.getProviders();
    const newProviders = response.map(({ name, providerId }) => ({ label: name, value: providerId }));
    setProviders(newProviders);
  };

  const handleInputChange = useCallback((item: ISelectOption) => {
    setFieldValue('providerId', item.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <SelectInput
      name='providerId'
      label='Dostawca'
      defaultValue={initialValues.providerId}
      items={providers}
      onChange={handleInputChange}
    />
  );
};

export default ProvidersSelect;
