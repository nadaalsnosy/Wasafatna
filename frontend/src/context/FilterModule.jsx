import { useMemo, createContext, useState } from "react";

const FilterContext = createContext();

export const FilterModule = ({ children }) => {
  const [filterRecipes, setFilterRecipes] = useState([]);

  const contextValue = useMemo(
    () => ({
      filterRecipes,
      setFilterRecipes,
    }),
    [filterRecipes, setFilterRecipes]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterModule;
