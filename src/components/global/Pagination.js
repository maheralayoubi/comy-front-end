import React from "react";
import "./styles/Pagination.scss";

const Pagination = ({ paginate, currentPage, totalPages }) => {
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 4; // Maximum number of pages to show at a time
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages based on current page
      startPage = Math.max(currentPage - halfPagesToShow, 1);
      endPage = startPage + maxPagesToShow - 1;

      // Adjust if endPage exceeds totalPages
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPagesToShow + 1;
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "active" : "";
      items.push(
        <button key={page} className={className} onClick={() => paginate(page)}>
          {page}
        </button>,
      );
    }

    return items;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        前へ
      </button>
      {renderPaginationItems()}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
