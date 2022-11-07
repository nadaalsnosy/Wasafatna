import { useMemo, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FilterContext = createContext();

export const FilterModule = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  let page = query.get("page") || "";
  let genre = query.get("genre") || "";
  let order = query.get("order") || "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageChanges = (e, p, id, keyword, favourite) => {
    query.set("page", p);
    navigate(
      `${
        id
          ? `/userRecipes/${id}?${query.toString()}`
          : `${
              keyword
                ? `/search/${keyword}?${query.toString()}`
                : `${
                    favourite
                      ? `/favourite/?${query.toString()}`
                      : `/?${query.toString()}`
                  }`
            }`
      }`
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeValue = (e, id, keyword, favourite) => {
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
                : `${
                    favourite
                      ? `/favourite/?${query.toString()}`
                      : `/?${query.toString()}`
                  }`
            }`
      }`
    );
  };

  const contextValue = useMemo(
    () => ({
      handleChangeValue,
      pageChanges,
      order,
      genre,
      page,
    }),
    [handleChangeValue, pageChanges, order, genre, page]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
