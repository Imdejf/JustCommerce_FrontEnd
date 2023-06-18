import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import SalesChannelForm from './SalesChannelForm';
import ContentContainer from '../../layout/ContentContainer';

import salesChannelsService from '../../../services/salesChannelServices';
import { getNotEmptyFields } from '../../../utils/objectUtils';
import { ISalesChannelRequest } from '../../../types/salesChannelTypes';
import { showServerErrors } from '../../../utils/errorsUtils';

const AddSalesChannel: React.FC = () => {
  const { goBack } = useHistory();
  const salesChannel: ISalesChannelRequest = {
    id: '',
    isActive: true,
    isFromParentSource: false,
    name: '',
    providerId: '',
    subgroupId: '',
    group: 0,
  };

  const handleSubmit = async (values: ISalesChannelRequest) => {
    try {
      const salesChannel = getNotEmptyFields<ISalesChannelRequest>(values);
      await salesChannelsService.add(salesChannel);
      toast.success(`Dodano kanał sprzedaży!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title='Dodaj kanał sprzedaży'>
      <SalesChannelForm salesChannel={salesChannel} onSubmit={handleSubmit} isEdit={false} />
    </ContentContainer>
  );
};

export default AddSalesChannel;
