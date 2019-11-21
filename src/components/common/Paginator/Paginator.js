import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({
  totalItems,
  pageSize,
  currentPage,
  setPage,
  disabled,
  sideLength = 3,
  size = "sm"
}) => {
  const pagesCount = Math.ceil(totalItems / pageSize);

  const onClick = page => () => setPage(page);

  const createItem = (page, active = false) => (
    <Pagination.Item
      key={page}
      onClick={onClick(page)}
      active={active}
      disabled={!active && disabled}
    >
      {page}
    </Pagination.Item>
  );

  const createEllipsis = (page) => (
    <Pagination.Ellipsis
      key={page}
      onClick={onClick(page)}
      disabled={disabled}
    />
  );

  const createFirst = () => (
    <Pagination.First
      onClick={onClick(1)}
      disabled={disabled || currentPage <= 1}
    />
  );

  const createPrev = () => (
    <Pagination.Prev
      onClick={onClick(currentPage - 1)}
      disabled={disabled || currentPage <= 1}
    />
  );

  const createNext = () => (
    <Pagination.Next
      onClick={onClick(currentPage + 1)}
      disabled={disabled || currentPage >= pagesCount}
    />
  );

  const createLast = () => (
    <Pagination.Last
      onClick={onClick(pagesCount)}
      disabled={disabled || currentPage >= pagesCount}
    />
  );

  const pageItemsGenerator = function* () {
    let firstPage = 1;

    if (currentPage > sideLength + 1) {
      yield createEllipsis(currentPage - sideLength - 1);
      firstPage = currentPage - sideLength;
    }

    for (
      let i = firstPage;
      i < currentPage + sideLength + 1 && i <= pagesCount;
      ++i
    ) {
      yield createItem(i, i === currentPage);
    }

    if (currentPage < pagesCount - sideLength) {
      yield createEllipsis(currentPage + sideLength + 1);
    }
  };

  return (
    <Pagination size={size} className="m-0">
      {createFirst()}
      {createPrev()}
      {[...pageItemsGenerator()]}
      {createNext()}
      {createLast()}
    </Pagination>
  );
};

export default Paginator;