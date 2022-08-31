import { Routes, Route } from "react-router-dom";
import { useMemo, createContext, useState } from "react";
import axios from "../api/axios";
import Home from "../pages/Home";

export const RecipessContext = createContext();

const RecipesModule = () => {
  const [recipes, setRecipes] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecipes = async (page, limit, order, sort) => {
    try {
      const res = await axios.get(
        `/recipes?${page ? `page=${page}` : ""}&${
          limit ? `limit=${limit}` : ""
        }&${order ? `order=${order}` : ""}&${sort ? `sort=${sort}` : ""}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = useMemo(
    () => ({
      getRecipes,
      recipes,
      setRecipes,
    }),
    [getRecipes, recipes, setRecipes]
  );

  return (
    <RecipessContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </RecipessContext.Provider>
  );
};

export default RecipesModule;
