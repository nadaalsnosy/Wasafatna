import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

import { RecipesContext } from "../context/RecipesModule";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { recipes, setRecipes, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let pageNum = location.search.split("?page=")[1];

  const [page, setPage] = useState(pageNum);

  useEffect(() => {
    getRecipes(page);
  }, [page]);

  const pageChanges = (e, p) => {
    navigate(`?page=${p}`);
    setPage(p);
  };

  useEffect(() => {
    getRecipes(pageNum);
    setPage(location.search.split("?page=")[1]);
  }, []);

  return (
    <>
      <AnimatedPage>
        <div className="position-relative">
          <div className="overLay"></div>
          <IconsSlider />
        </div>
        <div className="container d-flex flex-wrap mt-5">
          {recipes?.map((item) => (
            <RecipeCard key={item._id} item={item} />
          ))}
        </div>
        <Stack className="container mt-5" spacing={2}>
          <Pagination
            count={recipesPageCounter}
            color="success"
            onChange={pageChanges}
            page={+pageNum || 1}
          />
        </Stack>
      </AnimatedPage>
    </>
  );
};

export default Home;
