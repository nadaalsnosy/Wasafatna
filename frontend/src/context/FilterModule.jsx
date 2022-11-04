import { useMemo, createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FilterContext = createContext();

export const FilterModule = ({ children }) => {
  const [filterRecipes, setFilterRecipes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  let page = query.get("page") || "";
  let genre = query.get("genre") || "";
  let order = query.get("order") || "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageChanges = (e, p, id, keyword) => {
    console.log(keyword);
    query.set("page", p);
    navigate(
      `${
        id
          ? `/userRecipes/${id}?${query.toString()}`
          : `${
              keyword
                ? `/search/${keyword}?${query.toString()}`
                : `/?${query.toString()}`
            }`
      }`
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeValue = (e, id, keyword) => {
    const val = e.target.value;
    const name = e.target.name;

    if (name === "genre") query.set("genre", val);
    if (name === "order") query.set("order", val);
    query.set("page", 1);
    navigate(
      `${
        id
          ? `/userRecipes/${id}?${query.toString()}`
          : `${
              keyword
                ? `/search/${keyword}?${query.toString()}`
                : `/?${query.toString()}`
            }`
      }`
    );
  };

  const contextValue = useMemo(
    () => ({
      filterRecipes,
      setFilterRecipes,
      handleChangeValue,
      pageChanges,
      order,
      genre,
      page,
    }),
    [
      filterRecipes,
      setFilterRecipes,
      handleChangeValue,
      pageChanges,
      order,
      genre,
      page,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
