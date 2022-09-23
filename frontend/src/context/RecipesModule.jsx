import { Routes, Route, useLocation } from "react-router-dom";
import { useMemo, createContext, useState } from "react";

import axios from "../api/axios";
// import RequireAuth from "./Auth/RequireAuth";

import Home from "../pages/Home";

import NavbarComp from "../components/NavbarComp";

import Product from "../pages/Product";
import Products from "../pages/Products";

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
{/* 
        <Route path="/ali" element={<Products />} />
        <Route path="/ali/:id" element={<Product />} /> */}

        {/* <Route element={<RequireAuth />}></Route> */}
      </Routes>
    </RecipessContext.Provider>
  );
};

export default RecipesModule;
