import { useContext, useEffect } from "react";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

import RecipesContext from "../context/RecipesModule";
import FilterContext from "../context/FilterModule";

import {
  MenuItem,
  FormControl,
  Select,
  Stack,
  Pagination,
} from "@mui/material";

const Home = () => {
  const { recipes, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);
  const { handleChangeValue, pageChanges, order, genre, page } =
    useContext(FilterContext);

  useEffect(() => {
    getRecipes("", page, genre, order);
  }, [page, genre, order]);

  useEffect(() => {
    getRecipes("", page, genre, order);
  }, []);

  return (
    <>
      <AnimatedPage>
        <div className="position-relative">
          <div className="overLay"></div>
          <IconsSlider />
        </div>
        <div className="filterOptions">
          <FormControl className="d-block ms-3 selectInput genreType">
            <Select
              className="w-100"
              name="genre"
              value={genre}
              onChange={(e) => handleChangeValue(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="all">ِAll</MenuItem>
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="desserts">Desserts</MenuItem>
              <MenuItem value="juices">Juices</MenuItem>
              <MenuItem value="meals">Meals</MenuItem>
              <MenuItem value="pastries">Pastries</MenuItem>
              <MenuItem value="salad">Salad</MenuItem>
              <MenuItem value="others">Others</MenuItem>
              <MenuItem className="d-none" value=""></MenuItem>
            </Select>
          </FormControl>

          <FormControl className="d-block ms-3 selectInput sortBy">
            <Select
              className="w-100"
              name="order"
              value={order}
              onChange={(e) => handleChangeValue(e)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem className="orderItem" value="-1">
                Newest
              </MenuItem>
              <MenuItem value="1">Oldest</MenuItem>
              <MenuItem className="d-none" value=""></MenuItem>
            </Select>
          </FormControl>
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
            onChange={(e, p) => pageChanges(e, p)}
            page={+page || 1}
          />
        </Stack>
      </AnimatedPage>
    </>
  );
};

export default Home;
