import { ReactChild } from 'react';

export type TableHeaderType = {
  label: string;
  key: string;
  sortable?: boolean;
};

export type TableColumnType = {
  key: string;
  title: string;
  content: ReactChild;
};

export type TableRowType = {
  cols: TableColumnType[];
  onClick?: () => void;
};
