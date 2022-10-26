import { useContext, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

import { RecipesContext } from "../context/RecipesModule";

const Home = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { auth } = useAuth();

  const getRecipes = async (page, limit, order, sort) => {
    try {
      const res = await axios.get(
        `/recipes?${page ? `page=${page}` : ""}&${
          limit ? `limit=${limit}` : ""
        }&${order ? `order=${order}` : ""}&${sort ? `sort=${sort}` : ""}`
      );
      setRecipes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  console.log(recipes);

  return (
    <>
      <AnimatedPage>
        <div className="position-relative">
          <div className="overLay">{/* <h1>Welcome To WasaFatna</h1> */}</div>
          <IconsSlider />
        </div>
        <div className="container d-flex flex-wrap mt-5">
          {recipes?.map((item) => (
            <RecipeCard key={item._id} item={item} />
          ))}
        </div>
      </AnimatedPage>
    </>
  );
};

export default Home;
