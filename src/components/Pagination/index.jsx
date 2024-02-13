import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module";

const Pagination = () => {
  const dispatch = useDispatch();
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // Жёстко указываем кол-во страниц из-за RESTAPI (MockAPI)
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
