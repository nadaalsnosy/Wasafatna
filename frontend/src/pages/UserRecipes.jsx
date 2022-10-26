import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const UserRecipes = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container">
          <div className="d-flex flex-column justify-content-between align-items-md-baseline flex-md-row">
            <h1 className="fs-45 text-start m-auto my-5 mx-md-2 text-success">
              My Recipes
            </h1>
            <Link to={"/createRecipe"}>
              <Button
                className="mb-3 m-md-0 me-md-4"
                variant="contained"
                color="error"
              >
                Create New Recipe
              </Button>
            </Link>
          </div>
          <div className="container d-flex flex-wrap">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default UserRecipes;
