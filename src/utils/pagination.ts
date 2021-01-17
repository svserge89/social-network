export const getPagesCount = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize) || 1;
};

export const isValidPage = (
  page: number,
  minPage: number,
  totalItems: number,
  pageSize: number
): boolean => {
  return totalItems
    ? page >= minPage && page <= getPagesCount(totalItems, pageSize)
    : page >= minPage;
};
