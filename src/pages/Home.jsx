import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj} />);

  React.useEffect(() => {
    const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        fetchPizzas({
          category,
          sortBy,
          order,
          search,
          currentPage,
        })
      );

      window.scrollTo(0, 0);
    };
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, что-то сломалось. Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default Home;
