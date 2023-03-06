import { SortState } from 'types/globalTypes';
import SortableHeaderCell from './sortableHeaderCell/SortableHeaderCell';
import { TableHeaderType } from './tableTypes';

type Props = {
  headers: TableHeaderType[];
  sortState: SortState;
  handleSort: (sortState: SortState) => void;
};

const TableHeader = ({ headers, sortState, handleSort }: Props) => {
  return (
    <thead>
      <tr>
        {headers.map((header, idx) => (
          <th key={idx}>
            <SortableHeaderCell sortState={sortState} header={header} handleSort={handleSort} />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
