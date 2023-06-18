import DataTable from 'components/common/dataTable/DataTable';
import StatusInfo from 'components/statusInfo/StatusInfo';

import { ISalesChannel } from 'types/salesChannelTypes';

interface ISalesChannelTableProps {
  salesChannels: Array<ISalesChannel>;
  containerRef: any;
  lastItemRef: any;
  isDataLoading: boolean;
}

const SalesChannelTable: React.FC<ISalesChannelTableProps> = ({
  salesChannels,
  containerRef,
  isDataLoading,
  lastItemRef,
}) => {
  const headers = ['Nazwa', 'Grupa', 'Kategoria', 'Dostawca', 'Status'];

  const rows = salesChannels.map((salesChannel) => ({
    data: { link: `/settlements/salesChannel/edit/${salesChannel.id}` },
    cols: [
      salesChannel.name,
      salesChannel.group.flagName,
      salesChannel.subgroup.name,
      salesChannel.provider.name,
      <StatusInfo
        className='flex gap-x-2 px-8 md: -ml-4 md:pl-2/10 lg:pl-3/10 2xl:pl-4/10'
        status={salesChannel.isActive.toString()}
      />,
    ],
  }));

  return (
    <DataTable
      rows={rows}
      headers={headers}
      isDataLoading={isDataLoading}
      containerRef={containerRef}
      lastItemRef={lastItemRef}
    />
  );
};

export default SalesChannelTable;
