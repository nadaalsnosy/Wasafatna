import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import {
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Pagination,
} from "@mui/material";

import useAuth from "../hooks/useAuth";
import RecipesContext from "../context/RecipesModule";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";

const UserRecipes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { recipes, emptyData, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);
  const { id } = useParams();
  const { auth } = useAuth();

  const query = new URLSearchParams(location.search);

  let page = query.get("page") || "";
  let genre = query.get("genre") || "";
  let order = query.get("order") || "";

  useEffect(() => {
    getRecipes(id, page, genre, order);
  }, [id, page, genre, order]);

  const pageChanges = (e, p) => {
    query.set("page", p);
    navigate(`/userRecipes/${id}?${query.toString()}`);
  };

  useEffect(() => {
    getRecipes(id, page, genre, order);
  }, []);

  const handleChangeValue = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    if (name === "genre") query.set("genre", val);
    if (name === "order") query.set("order", val);
    query.set("page", 1);
    navigate(`/userRecipes/${id}?${query.toString()}`);
  };

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <div className="d-flex flex-column justify-content-between align-items-md-baseline flex-md-row">
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
          <div className="filterOptions">
            <FormControl className="d-block ms-3 selectInput genreType">
              <Select
                className="w-100"
                name="genre"
                value={genre}
                onChange={handleChangeValue}
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
                onChange={handleChangeValue}
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

          {emptyData ? (
            <p className="noDataP">
              There ara No Recipes in Category{" "}
              <span className="text-capitalize">{genre}</span>
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
                  onChange={pageChanges}
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

export default UserRecipes;
