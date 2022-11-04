import { Routes, Route, useLocation } from "react-router-dom";

import NavbarComp from "../components/NavbarComp";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Recipe from "../pages/Recipe";

import Profile from "../pages/Profile";
import Favourite from "../pages/Favourite";
import UserRecipes from "../pages/UserRecipes";
import SaveRecipe from "../pages/SaveRecipe";

const PagesRoutes = () => {
  const location = useLocation();

  return (
    <>
      <NavbarComp />
      <Routes path="*" location={location} key={location.pathname}>
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
    </>
  );
};

export default PagesRoutes;
