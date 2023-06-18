import { ReactNode } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import TableHeader from "./DataTableHeader";
import TableRow from "./DataTableRow";

import "overlayscrollbars/css/OverlayScrollbars.css";
import HomeDataTableHeader from "./HomeDataTableHeader";
import HomeDataTableRow from "./HomeDataTableRow";

interface ITableProps {
  colSizes?: Array<number>;
  containerRef?: any;
  headers: any;
  lastItemRef?: any;
  rows: Array<{ data?: { link?: string }; cols: Array<ReactNode> }>;
  isDataLoading: boolean;
}

const HomeDataTable: React.FC<ITableProps> = ({
  colSizes = [],
  headers,
  rows,
  containerRef,
  isDataLoading,
  lastItemRef,
}) => {
  return (
    <OverlayScrollbarsComponent className="pb-12 pr-4">
      <table
        className="table"
        cellSpacing={12}
        cellPadding={10}
        style={{ minWidth: "800px" }}
      >
        <colgroup>
          {colSizes.map((size, idx) => (
            <col key={idx} style={{ width: size + "%" }} />
          ))}
        </colgroup>

        <HomeDataTableHeader headers={headers} />
        <tbody ref={containerRef}>
          {rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            return isLast ? (
              <HomeDataTableRow key={index} row={row} innerRef={lastItemRef} />
            ) : (
              <HomeDataTableRow key={index} row={row} />
            );
          })}
        </tbody>
      </table>
      <div>{isDataLoading && "Loading..."} </div>
    </OverlayScrollbarsComponent>
  );
};

export default HomeDataTable;
