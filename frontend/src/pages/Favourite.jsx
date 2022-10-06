import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const Favourite = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container">
          <div className="d-flex flex-column justify-content-between align-items-baseline flex-md-row">
            <h1 className="fs-45 text-start my-5 mx-2 text-success">
              My Favourite
            </h1>
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

export default Favourite;
