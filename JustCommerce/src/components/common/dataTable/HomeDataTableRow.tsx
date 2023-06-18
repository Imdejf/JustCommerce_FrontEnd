import { ReactNode, RefObject } from "react";
import { useHistory } from "react-router";

type DataTableRowProps = {
  row: { data?: { link?: string }; cols: Array<ReactNode> };
  innerRef?: RefObject<HTMLTableRowElement>;
};

const HomeDataTableRow: React.FC<DataTableRowProps> = ({ innerRef, row }) => {
  const { push } = useHistory();
  const handleRowClick = () => {
    if (row.data?.link) {
      push(row.data.link);
    }
  };

  return (
    <tr
      ref={innerRef}
      onClick={handleRowClick}
      data-clickable={!!row.data?.link}
    >
      {row.cols.map((col, idx) => {
        const title = typeof col === "string" ? col : "";
        return (
          <td colSpan={idx === 3 ? 3 : 1} key={idx} title={title}>
            {col || <span className="opacity-40">{"- brak -"}</span>}
          </td>
        );
      })}
    </tr>
  );
};

export default HomeDataTableRow;
