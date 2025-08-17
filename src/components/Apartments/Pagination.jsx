import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn btn-sm ${
            currentPage === page ? "btn-primary" : "btn-outline"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
