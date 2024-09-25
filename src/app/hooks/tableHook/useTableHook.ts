import React from "react";
import { ScrollX, UseTableScroll } from "./useTableHook.types";
import { TableRef } from "antd/es/table";
import { getPaginationHeight } from "./useTableHook.lib";
import { useDebouncedCallback } from "use-debounce";

export const useTableScroll = (
  scrollX: ScrollX = true,
  stretchByPage: boolean = true,
  delay: number = 50
): UseTableScroll => {
  const [scrollY, setScrollY] = React.useState<number | undefined>(0);
  const tableRef = React.useRef<TableRef>(null);

  const calcScrollY = () => {
    const tableWrapper = tableRef.current?.nativeElement;
    if (!tableWrapper) return;

    const tBody = tableWrapper.getElementsByTagName("tbody")[0];
    if (!tBody) return;

    const empty = tableWrapper.getElementsByClassName("ant-empty")[0];
    if (empty) return setScrollY(undefined);

    const { y: tBodyY } = tBody.getBoundingClientRect();
    const totalHeight =
      window.innerHeight - tBodyY - getPaginationHeight(tableWrapper);

    setScrollY(totalHeight);
  };

  const debounce = useDebouncedCallback(calcScrollY, delay);

  React.useLayoutEffect(() => {
    debounce();
    window.addEventListener("resize", calcScrollY);

    return () => {
      window.removeEventListener("resize", calcScrollY);
    };
  }, [tableRef.current?.nativeElement]);

  React.useLayoutEffect(() => {
    if (!stretchByPage) return;

    const tableWrapper = tableRef.current?.nativeElement;
    if (!tableWrapper) return;

    const tableBody = tableWrapper.getElementsByClassName(
      "ant-table-body"
    )[0] as HTMLDivElement;
    if (!tableBody) return;

    tableBody.style.height = scrollY ? `${scrollY}px` : "20vh";
    // tableBody.style.overflow = tableBody.style.overflow.replace("scroll", "auto");
  }, [scrollY]);

  return { tableRef, scroll: { x: 1200, y: scrollY } };
};
