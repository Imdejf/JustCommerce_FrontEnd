import { TableRowType } from './tableTypes';

type Props = {
  row: TableRowType;
};

const TableRow = ({ row }: Props) => {
  const handleClick = () => {
    if (row.onClick) {
      row.onClick();
    }
  };

  return (
    <tr onClick={handleClick} data-clickable={!!row.onClick}>
      {row.cols.map((col) => (
        <td key={col.key} title={col.title}>
          {col.content}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
