import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

import { RecipesContext } from "../context/RecipesModule";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

const Home = () => {
  const { recipes, setRecipes, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // let pageNum = location.search.split("?page=")[1];
  // let pageNum = query.get("page");
  let page = query.get("page");
  let genre = query.get("genre");

  // console.log(pageNum);

  // console.log(query.get("genre"));

  console.log(recipes);

  // const [page, setPage] = useState(pageNum);

  useEffect(() => {
    getRecipes(page, genre);
  }, [page, genre]);

  const pageChanges = (e, p) => {
    // navigate(`?page=${p}`);

    query.set("page", p);
    if (genre) query.set("genre", genre);

    navigate(`/?${query.toString()}`);
    console.log(query.toString());
    // const params = { page: p };
    // if ("genre") params.genre = "others";
    // navigate({
    //   pathname: "/",
    //   search: `?${createSearchParams(params)}`,
    // });
    // setPage(p);
  };

  useEffect(() => {
    getRecipes(page, genre);
    // setPage(location.search.split("?page=")[1]);
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
            page={+page || 1}
          />
        </Stack>
      </AnimatedPage>
    </>
  );
};

export default Home;
