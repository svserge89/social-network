import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';

import Paginator from '../Paginator/Paginator';
import PageSizeSelector from '../PageSizeSelector/PageSizeSelector';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

const PageNavToolbar = ({
                          total,
                          size,
                          page,
                          setPage,
                          setSize,
                          available,
                          sideLength = 3,
                          buttonSize = 'sm',
                          fetching
                        }) => {
  const showPaginator = () => (
    total
      ? (<Paginator totalItems={total}
                    pageSize={size}
                    currentPage={page}
                    setPage={setPage}
                    sideLength={sideLength}
                    size={buttonSize}
                    disabled={fetching}/>)
      : (<ButtonLoader size={buttonSize}/>)
  );

  return (
    <ButtonToolbar className="justify-content-between px-0 mt-3">
      {showPaginator()}
      <PageSizeSelector available={available}
                        current={size}
                        change={setSize}
                        size={buttonSize}
                        disabled={fetching}/>
    </ButtonToolbar>
  )
};

export default PageNavToolbar;