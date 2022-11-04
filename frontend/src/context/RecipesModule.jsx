import { useMemo, createContext, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const RecipesContext = createContext();

export const RecipesModule = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [recipesPageCounter, setRecipesPageCounter] = useState();
  const [recipe, setRecipe] = useState();
  const [emptyData, setEmptyData] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecipes = async (id, page, genre, order, limit, sort) => {
    try {
      const res = await axios.get(
        `${id ? `recipes/userRecipes/${id}` : `/recipes`}?${
          page ? `page=${page}` : ""
        }&${genre ? `genre=${genre}` : ""}&${order ? `order=${order}` : ""}&${
          limit ? `limit=${limit}` : ""
        }&${sort ? `sort=${sort}` : ""}`
      );
      if (res.data.recipes.length === 0) {
        setEmptyData(true);
      } else {
        setEmptyData(false);
        setRecipesPageCounter(res.data.recipesPageCounter);
        setRecipes(res.data.recipes);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecipe = async (id) => {
    try {
      const res = await axios.get(`/recipes/${id}`);
      setRecipe(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = useMemo(
    () => ({
      getRecipe,
      recipe,
      setRecipe,
      recipesPageCounter,
      getRecipes,
      recipes,
      setRecipes,
      emptyData,
    }),
    [
      getRecipe,
      recipe,
      setRecipe,
      recipesPageCounter,
      getRecipes,
      recipes,
      setRecipes,
      emptyData,
    ]
  );

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
