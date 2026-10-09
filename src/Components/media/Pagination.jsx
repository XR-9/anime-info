import { useSearch } from "../../context/searchContext";

function Pagination({ onPageChange  , totalPage , currentPage}) {
  if(totalPage <= 1) return null;

  return (
    <div className="Pagination-container">
    <button   className={`page-btn prev-btn ${currentPage === 1 ? "hide-btn" : ""}`}
        onClick={() => {onPageChange(currentPage  - 1)}}
      >
        ← Prev
      </button>
       <button  className={`page-btn next-btn ${currentPage === totalPage ? "hide-btn" : ""}`}
        onClick={() => onPageChange(currentPage+ 1)}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;