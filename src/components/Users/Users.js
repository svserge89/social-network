import React, { useState } from 'react';
import Paginator from '../common/Paginator/Paginator';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Paginator totalItems={500} pageSize={10} currentPage={currentPage}
      setPage={setCurrentPage} sideLength={5} />
  );
};

export default Users;