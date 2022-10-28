import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { RecipesContext } from "../context/RecipesModule";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const UserRecipes = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { id } = useParams();
  console.log(id);

  const { auth } = useAuth();
  // console.log(auth.user._id);
  const getRecipes = async (page, limit, order, sort) => {
    try {
      const res = await axios.get(
        `recipes/userRecipes/${id}?${page ? `page=${page}` : ""}&${
          limit ? `limit=${limit}` : ""
        }&${order ? `order=${order}` : ""}&${sort ? `sort=${sort}` : ""}`
      );
      setRecipes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recipes);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <div className="d-flex flex-column justify-content-between align-items-md-baseline flex-md-row">
            <h1 className="fs-45 text-start m-auto my-5 mx-md-2 text-success">
              My Recipes
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
        </div>
      </AnimatedPage>
    </>
  );
};

export default UserRecipes;
