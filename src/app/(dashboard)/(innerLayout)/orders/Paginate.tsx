import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({
  pageCount,
  handlePageClick,
}: {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={handlePageClick}
      previousLabel="< "
      renderOnZeroPageCount={null}
      pageRangeDisplayed={5}
      className="flex justify-center items-center mt-4 md:mt-10 mb-10 space-x-3"
      activeClassName="bg-gray-500 text-white"
      previousClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
      nextClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
      pageClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
    />
  );
};

export default Paginate;
