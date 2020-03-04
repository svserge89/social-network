import React from 'react';
import {Pagination} from 'react-bootstrap';

import {PaginatorProps} from './types';

const Paginator: React.FC<PaginatorProps> = ({
                     totalItems,
                     pageSize,
                     currentPage,
                     setPage,
                     disabled,
                     sideLength = 3,
                     size = 'sm'
                   }) => {
  const pagesCount = Math.ceil(totalItems / pageSize);

  const onClick = (page: number) => () => setPage(page);

  const createItem = (page: number, active = false): JSX.Element => (
    <Pagination.Item key={page}
                     onClick={onClick(page)}
                     active={active}
                     disabled={!active && disabled}>
      {page}
    </Pagination.Item>
  );

  const createEllipsis = (page: number): JSX.Element => (
    <Pagination.Ellipsis key={page} onClick={onClick(page)} disabled={disabled}/>
  );

  const createFirst = (): JSX.Element => (
    <Pagination.First onClick={onClick(1)} disabled={disabled || currentPage <= 1}/>
  );

  const createPrev = (): JSX.Element => (
    <Pagination.Prev onClick={onClick(currentPage - 1)}
                     disabled={disabled || currentPage <= 1}/>
  );

  const createNext = (): JSX.Element => (
    <Pagination.Next onClick={onClick(currentPage + 1)}
                     disabled={disabled || currentPage >= pagesCount}/>
  );

  const createLast = (): JSX.Element => (
    <Pagination.Last onClick={onClick(pagesCount)}
                     disabled={disabled || currentPage >= pagesCount}/>
  );

  const pageItemsGenerator = function* (): Iterable<JSX.Element> {
    let firstPage = 1;

    if (currentPage > sideLength + 1) {
      yield createEllipsis(currentPage - sideLength - 1);

      firstPage = currentPage - sideLength;
    }

    for (let i = firstPage; i < currentPage + sideLength + 1 && i <= pagesCount; ++i) {
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