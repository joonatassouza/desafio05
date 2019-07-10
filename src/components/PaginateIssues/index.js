import React from 'react';
import PropTypes from 'prop-types';

import { PaginationButtons } from './styles';

function PaginateIssues({ handlePagination, page, lastPage }) {
  return (
    <PaginationButtons>
      <button
        type="button"
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => handlePagination(page + 1)}
        disabled={lastPage}
      >
        Next
      </button>
    </PaginationButtons>
  );
}

PaginateIssues.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.bool.isRequired,
};

export default PaginateIssues;
