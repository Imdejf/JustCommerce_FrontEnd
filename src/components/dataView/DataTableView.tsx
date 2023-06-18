import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ILicensor } from '../../types/licensorTypes';
import DataTable from '../common/dataTable/DataTable';

interface IDataTableViewProps {
  licensors: Array<ILicensor>;
  containerRef: any;
  lastItemRef: any;
  isDataLoading: boolean;
}

const DataTableView: React.FC<IDataTableViewProps> = ({ licensors, containerRef, isDataLoading, lastItemRef }) => {
  const rows = licensors.map((licensor) => ({
    data: { link: `/licensors/detail/${licensor.id}` },
    cols: [
      licensor.name,
      <Link
        to={`/licensors/detail/${licensor.id}`}
        className='flex flex-col rounded bg-opacity-50 bg-white p-4 text-sm leading-relaxed hover:bg-opacity-90'
      >
        Szczegóły
      </Link>,
    ],
  }));

  const headers = ['Nazwa', 'Akcja'];
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

export default DataTableView;
