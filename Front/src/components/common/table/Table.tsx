import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useState } from 'react';
import { SortDirection, SortState } from 'types/globalTypes';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { TableHeaderType, TableRowType } from './tableTypes';

type Props = {
  colSizes?: number[];
  headers: TableHeaderType[];
  rows: TableRowType[];
};

const Table = ({ colSizes = [], headers = [], rows = [] }: Props) => {
  const [visibleData, setVisibleData] = useState<typeof rows>([]);
  const [sortState, setSortState] = useState<SortState>({ key: '', direction: SortDirection.ASC });

  const handleSort = ({ key, direction }: SortState) => {
    setSortState({ key, direction });
  };

  useEffect(() => {
    setVisibleData(rows);
  }, [rows]);

  useEffect(() => {
    const sortedRows = [...rows].sort((a, b) => {
      const { direction, key } = sortState;
      const itemA = a.cols.find((a) => a.key === key);
      const itemB = b.cols.find((a) => a.key === key);

      if (!itemA || !itemB) return 0;

      if (direction === SortDirection.ASC) {
        return itemA.title.localeCompare(itemB.title);
      }
      if (direction === SortDirection.DESC) {
        return itemB.title.localeCompare(itemA.title);
      }
      return 0;
    });

    setVisibleData(sortedRows);
  }, [rows, sortState]);

  return (
    <OverlayScrollbarsComponent className='pb-12 pr-4' style={{ minHeight: '200px' }}>
      <table className='table' cellPadding='0' cellSpacing='0' style={{ minWidth: '800px' }}>
        <colgroup>
          {colSizes.map((size, idx) => (
            <col key={idx} style={{ width: size + '%' }} />
          ))}
        </colgroup>

        <TableHeader headers={headers} sortState={sortState} handleSort={handleSort} />
        <tbody>
          {visibleData.length ? (
            visibleData.map((row, index) => <TableRow key={index} row={row} />)
          ) : (
            <tr>
              <td colSpan={headers.length}>NO RESULTS</td>
            </tr>
          )}
        </tbody>
      </table>
    </OverlayScrollbarsComponent>
  );
};

export default Table;
