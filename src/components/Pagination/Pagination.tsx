import { Observer } from "mobx-react-lite";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { useStore } from "../../stores/store";

import "./Pagination.scss";

function Pagination() {
  const { paginationStore } = useStore();

  return (
    <Observer>
      {() => (
        <div className="Pagination">
          Rows per page:
          <select
            className="Select Pagination__Select"
            onChange={(e) => {
              paginationStore.setRowsPerPage(Number(e.target.value));
            }}
            defaultValue={paginationStore.rowsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          Page {paginationStore.currentPage} of {paginationStore.pagesCount}
          <button
            type="button"
            onClick={() => {
              if (paginationStore.hasPrevPage) {
                paginationStore.setCurrentPage(paginationStore.currentPage - 1);
              }
            }}
            className={`Pagination__Button ${
              paginationStore.hasPrevPage ? "" : "Pagination__Button--Disabled"
            }`}
          >
            <LuChevronLeft
              className="Pagination__Chevron Pagination__Chevron--Left"
              size="24px"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              if (paginationStore.hasNextPage) {
                paginationStore.setCurrentPage(paginationStore.currentPage + 1);
              }
            }}
            className={`Pagination__Button ${
              paginationStore.hasNextPage ? "" : "Pagination__Button--Disabled"
            }`}
          >
            <LuChevronRight
              className="Pagination__Chevron Pagination__Chevron--Right"
              size="24px"
            />
          </button>
        </div>
      )}
    </Observer>
  );
}

export default Pagination;
