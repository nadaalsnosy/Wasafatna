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

  // useEffect(() => {
  //   setAuth(auth);
  // }, [auth]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRecipe = async (id) => {
    try {
      const res = await axios.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = useMemo(
    () => ({
      getRecipe,
      recipe,
      setRecipe,
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
        <Route path="/saveRecipe" element={<saveRecipe />} />
        <Route path="/editRecipe/:id" element={<saveRecipe />} />

        {/* </Route> */}
      </Routes>
    </RecipesContext.Provider>
  );
};

export default RecipesModule;
