import { Routes, Route, useLocation } from "react-router-dom";

import RequireAuth from "../Auth/RequireAuth";
import NavbarComp from "../components/NavbarComp";

import Home from "../pages/Home";
import Favourite from "../pages/Favourite";
import UserRecipes from "../pages/UserRecipes";
import SearchPage from "../pages/SearchPage";

import NotFound from "../pages/NotFound";
import Recipes from "../pages/Recipes";

import Recipe from "../pages/Recipe";
import Profile from "../pages/Profile";
import SaveRecipe from "../pages/SaveRecipe";

const PagesRoutes = () => {
  const location = useLocation();
  const favourite = "exist";

  return (
    <>
      <NavbarComp />
      <Routes path="*" location={location} key={location.pathname}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Recipes />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        {/* <Route path="/search/:keyword" element={<SearchPage />} /> */}
        <Route path="/search/:keyword" element={<Recipes />} />
          {/* <Route path="/userRecipes/:id" element={<UserRecipes />} /> */}
        <Route path="/userRecipes/:id" element={<Recipes />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/favourite" element={<Favourite />} /> */}
          <Route
            path="/favourite"
            element={<Recipes favourite={favourite} />}
          />
          <Route path="/saveRecipe" element={<SaveRecipe />} />
          <Route path="/editRecipe/:id" element={<SaveRecipe />} />
        </Route>
      </Routes>
    </>
  );
};

export default PagesRoutes;
