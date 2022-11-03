import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { RecipesContext } from "../context/RecipesModule";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const UserRecipes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { recipes, setRecipes } = useContext(RecipesContext);
  const { id } = useParams();
  const { auth } = useAuth();

  // let pageNum = location.search.split("?page=")[1];
  // const [page, setPage] = useState(pageNum);
  const query = new URLSearchParams(location.search);
  let page = query.get("page");
  const [recipesPageCounter, setRecipesPageCounter] = useState();

  const getRecipes = async (page, limit, order, sort) => {
    try {
      const res = await axios.get(
        `recipes/userRecipes/${id}?${page ? `page=${page}` : ""}&${
          limit ? `limit=${limit}` : ""
        }&${order ? `order=${order}` : ""}&${sort ? `sort=${sort}` : ""}`
      );
      setRecipesPageCounter(res.data.recipesPageCounter);
      setRecipes(res.data.userRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes(page);
  }, [page]);

  const pageChanges = (e, p) => {
    // navigate(`?page=${p}`);
    // setPage(p);

    query.set("page", p);
    navigate(`/userRecipes/${id}/?${query.toString()}`);
  };

  useEffect(() => {
    getRecipes(page);
    // setPage(location.search.split("?page=")[1]);
  }, []);

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <div className="d-flex flex-column justify-content-between align-items-md-baseline flex-md-row">
            <h1 className="fs-45 text-start m-auto my-5 mx-md-2 text-success">
              {auth?.user?._id === id ? "My Recipes" : "User Recipes"}
            </h1>
            {auth?.user?._id === id && (
              <Link to={"/saveRecipe"}>
                <Button
                  className="mb-3 m-md-0 me-md-4"
                  variant="contained"
                  color="error"
                >
                  Create New Recipe
                </Button>
              </Link>
            )}
          </div>
          <div className="container d-flex flex-wrap">
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
        </div>
      </AnimatedPage>
    </>
  );
};

export default UserRecipes;
