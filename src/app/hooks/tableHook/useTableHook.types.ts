import { TableProps, TableRef } from "antd/es/table";
import { RefObject } from "react";

export type UseTableScroll = {
  tableRef: RefObject<TableRef>;
  scroll: TableProps["scroll"];
};

export type ScrollX = string | number | true | undefined;
