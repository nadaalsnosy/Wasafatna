import { Routes, Route, useLocation } from "react-router-dom";
import { useMemo, createContext, useState } from "react";

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
import CreateRecipe from "../pages/CreateRecipe";

export const RecipesContext = createContext();

const RecipesModule = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);

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
  // getRecipes();
  const contextValue = useMemo(
    () => ({
      getRecipes,
      recipes,
      setRecipes,
      filterRecipes,
      setFilterRecipes,
    }),
    [getRecipes, recipes, setRecipes, filterRecipes, setFilterRecipes]
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
        <Route path="/myRecipes" element={<UserRecipes />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
        <Route path="/editRecipe/:id" element={<CreateRecipe />} />

        {/* </Route> */}
      </Routes>
    </RecipesContext.Provider>
  );
};

export default RecipesModule;
