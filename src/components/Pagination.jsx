import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`mx-2 px-4 py-2 rounded-full ${
            currentPage === index + 1
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-teal-600 hover:text-white transition duration-200`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
