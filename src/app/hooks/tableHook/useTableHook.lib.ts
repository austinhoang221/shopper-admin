export const getPaginationHeight = (tableWrapper: HTMLDivElement) => {
  let calculatedHeight = 0;

  const paginationElement = tableWrapper.getElementsByClassName(
    "ant-table-pagination"
  )[0];
  if (!paginationElement) return calculatedHeight;

  const { height } = paginationElement.getBoundingClientRect();
  const styles = window.getComputedStyle(paginationElement);
  const marginTop = +styles.marginTop.replace("px", "");
  const marginBottom = +styles.marginBottom.replace("px", "");

  calculatedHeight += height + marginTop + marginBottom;

  return calculatedHeight;
};
