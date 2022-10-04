import { Routes, Route, useLocation } from "react-router-dom";
import { useMemo, createContext, useState } from "react";

import axios from "../api/axios";
// import RequireAuth from "./Auth/RequireAuth";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import NavbarComp from "../components/NavbarComp";

import Profile from "../pages/Profile";
import Favourite from "../pages/Favourite";
import UserRecipes from "../pages/UserRecipes";
import Recipe from "../pages/Recipe";
import CreateRecipe from "../pages/CreateRecipe";

export const RecipessContext = createContext();

const RecipesModule = () => {
  const location = useLocation();

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
      <NavbarComp />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/recipe" element={<Recipe />} />

        {/* <Route element={<RequireAuth />}> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/myRecipes" element={<UserRecipes />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />

        {/* </Route> */}
      </Routes>
    </RecipessContext.Provider>
  );
};

export default RecipesModule;
