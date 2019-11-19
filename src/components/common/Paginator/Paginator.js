import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({
  totalItems,
  pageSize,
  currentPage,
  setPage,
  sideLength = 3
}) => {
  const pagesCount = Math.ceil(totalItems / pageSize);

  const onClick = page => () => setPage(page);

  const createItem = (page, active = false) => (
    <Pagination.Item onClick={onClick(page)} active={active}>
      {page}
    </Pagination.Item>
  );

  const createEllipsis = (page) => (
    <Pagination.Ellipsis onClick={onClick(page)} />
  );

  const createFirst = () => (
    <Pagination.First onClick={onClick(1)}
      disabled={currentPage <= 1} />
  );

  const createPrev = () => (
    <Pagination.Prev onClick={onClick(currentPage - 1)}
      disabled={currentPage <= 1} />
  );

  const createNext = () => (
    <Pagination.Next onClick={onClick(currentPage + 1)}
        disabled={currentPage >= pagesCount - 1} />
  );

  const createLast = () => (
    <Pagination.Last onClick={onClick(pagesCount - 1)}
        disabled={currentPage >= pagesCount - 1} />
  );

  const pageItemsGenerator = function* () {
    yield createFirst();
    yield createPrev();

    let firstPage = 1;

    if (currentPage > sideLength + 1) {
      yield createEllipsis(currentPage - sideLength - 1);
      firstPage = currentPage - sideLength;
    }

    for (let i = firstPage; i < currentPage + sideLength + 1 && i < pagesCount; ++i) {
      yield createItem(i, i === currentPage);
    }

    if (currentPage < pagesCount - sideLength - 1) {
      yield createEllipsis(currentPage + sideLength + 1);
    }

    yield createNext();
    yield createLast();
  };

  return (<Pagination>{[...pageItemsGenerator()]}</Pagination>);
};

export default Paginator;