import * as Yup from 'yup';

import { ISalesChannel, ISalesChannelRequest } from 'types/salesChannelTypes';
import { validationMessage } from './validation';

export const getArtistInitValues = (artist: ISalesChannel) => ({
  id: '',
  isActive: true,
  isFromParentSource: false,
  name: '',
  provider: '',
  subgroupId: '',
});

export const salesChannelValidations = Yup.object().shape({
  name: Yup.string().max(150, validationMessage.max(150)).required(validationMessage.isRequired),
  group: Yup.number().required(validationMessage.isRequired),
  subgroupId: Yup.string().nullable().required(validationMessage.isRequired),
});

export const salesChannelToReqestObject = (salesChannel: ISalesChannel): ISalesChannelRequest => {
  const { group, provider, subgroup, ...notFormattedData } = salesChannel;
  return { group: group.flagValue, providerId: provider.providerId, subgroupId: subgroup.id, ...notFormattedData };
};
