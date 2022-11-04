import { Routes, Route, useLocation } from "react-router-dom";
import { useMemo, createContext, useState, useEffect } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
// import RequireAuth from "./Auth/RequireAuth";

import NavbarComp from "../components/NavbarComp";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Recipe from "../pages/Recipe";

import Profile from "../pages/Profile";
import Favourite from "../pages/Favourite";
import UserRecipes from "../pages/UserRecipes";
import SaveRecipe from "../pages/SaveRecipe";

export const RecipesContext = createContext();

const RecipesModule = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState();
  const [recipesPageCounter, setRecipesPageCounter] = useState();

  const [filterRecipes, setFilterRecipes] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecipes = async (page, genre, order, limit, sort) => {
    try {
      const res = await axios.get(
        `/recipes?${page ? `page=${page}` : ""}&${
          genre ? `genre=${genre}` : ""
        }&${order ? `order=${order}` : ""}&${limit ? `limit=${limit}` : ""}&${
          sort ? `sort=${sort}` : ""
        }`
      );
      setRecipesPageCounter(res.data.recipesPageCounter);
      setRecipes(res.data.recipes);
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
      filterRecipes,
      setFilterRecipes,
    }),
    [
      getRecipe,
      recipe,
      setRecipe,
      recipesPageCounter,
      getRecipes,
      recipes,
      setRecipes,
      filterRecipes,
      setFilterRecipes,
    ]
  );

  return (
    <RecipesContext.Provider value={contextValue}>
      <NavbarComp />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/recipe/:id" element={<Recipe />} />

        {/* <Route element={<RequireAuth />}> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/userRecipes/:id" element={<UserRecipes />} />
        <Route path="/saveRecipe" element={<SaveRecipe />} />
        <Route path="/editRecipe/:id" element={<SaveRecipe />} />

        {/* </Route> */}
      </Routes>
    </RecipesContext.Provider>
  );
};

export default RecipesModule;
