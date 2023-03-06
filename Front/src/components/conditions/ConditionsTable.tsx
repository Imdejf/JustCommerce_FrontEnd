import DataTable from 'components/common/dataTable/DataTable';
import StatusInfo from 'components/statusInfo/StatusInfo';

import { ICondition } from 'types/conditionTypes';

interface IConditionTableProps {
  conditions: Array<ICondition>;
  isDataLoading: boolean;
}

const ConditionTable: React.FC<IConditionTableProps> = ({ conditions, isDataLoading }) => {
  const headers = ['Nazwa', 'Komentarz', 'Status'];

  const rows = conditions.map((condition) => ({
    data: { link: `/settlements/conditions/edit/${condition.id}` },
    cols: [
      condition.name,
      condition.comments,
      <StatusInfo className='flex gap-x-2 px-8 md: -ml-4 md:pl-3/10 lg:pl-4/10 ' status={`${condition.isActive}`} />,
    ],
  }));

  return <DataTable rows={rows} headers={headers} isDataLoading={isDataLoading} />;
};

export default ConditionTable;
