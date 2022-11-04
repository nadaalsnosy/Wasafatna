import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import {
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Pagination,
} from "@mui/material";

import useAuth from "../hooks/useAuth";
import IconsSlider from "../components/IconsSlider";

import RecipesContext from "../context/RecipesModule";
import FilterContext from "../context/FilterModule";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const { id } = useParams();
  const { keyword } = useParams();

  const { auth } = useAuth();

  const { recipes, emptyData, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);
  const { handleChangeValue, pageChanges, order, genre, page } =
    useContext(FilterContext);

  useEffect(() => {
    getRecipes(id, page, genre, order, keyword);
  }, [id, page, genre, order, keyword]);

  useEffect(() => {
    getRecipes(id, page, genre, order, keyword);
  }, []);

  return (
    <>
      <AnimatedPage>
        <div>
          {id ? (
            <div className="container d-flex flex-column justify-content-between align-items-md-baseline flex-md-row">
              <h1 className="fs-45 text-start m-auto my-5 mx-md-2 text-success">
                {auth?.user?._id === id ? "My Recipes" : "User Recipes"}
              </h1>
              {auth?.user?._id === id && (
                <Link
                  to={"/saveRecipe"}
                  className={`fit-content m-auto m-md-0 ms-md-auto`}
                >
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
          ) : (
            <>
              {keyword ? (
                <div className="container">
                  <h1 className="fs-45 text-start m-auto my-5 mx-md-2 text-success">
                    Search Result
                  </h1>
                </div>
              ) : (
                <div className="position-relative">
                  <div className="overLay"></div>
                  <IconsSlider />
                </div>
              )}
            </>
          )}
          <div className="container">
            <div className="filterOptions justify-content-center justify-content-md-end ">
              <FormControl className="d-block ms-3 selectInput genreType">
                <Select
                  className="w-100"
                  name="genre"
                  value={genre}
                  onChange={(e) => handleChangeValue(e, id, keyword)}
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
                  onChange={(e) => handleChangeValue(e, id, keyword)}
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
          </div>
          {emptyData ? (
            <p className="container noDataP">
              There ara No Recipes
              {keyword ? (
                ` Match your Search`
              ) : (
                <>
                  in Category <span className="text-capitalize">{genre}</span>
                </>
              )}
            </p>
          ) : (
            <>
              <div className="container d-flex flex-wrap">
                {recipes?.map((item) => (
                  <RecipeCard key={item._id} item={item} />
                ))}
              </div>
              <Stack className="container mt-5" spacing={2}>
                <Pagination
                  count={recipesPageCounter}
                  color="success"
                  onChange={(e, p) => pageChanges(e, p, id, keyword)}
                  // onChange={pageChanges}
                  page={+page || 1}
                />
              </Stack>
            </>
          )}
        </div>
      </AnimatedPage>
    </>
  );
};

export default Recipes;
