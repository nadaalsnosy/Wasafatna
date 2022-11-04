import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AnimatedPage from "../components/AnimatedPage";
import RecipeCard from "../components/RecipeCard";
import IconsSlider from "../components/IconsSlider";

import RecipesContext from "../context/RecipesModule";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MenuItem, FormControl, Select, Button } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { recipes, getRecipes, recipesPageCounter } =
    useContext(RecipesContext);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  let page = query.get("page") || "";
  let genre = query.get("genre") || "";
  let order = query.get("order") || "";

  useEffect(() => {
    getRecipes("", page, genre, order);
  }, [page, genre, order]);

  const pageChanges = (e, p) => {
    query.set("page", p);
    // if (genre) query.set("genre", genre);
    navigate(`/?${query.toString()}`);
  };

  useEffect(() => {
    getRecipes("", page, genre, order);
  }, []);

  const handleChangeValue = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    if (name === "genre") query.set("genre", val);
    if (name === "order") query.set("order", val);
    query.set("page", 1);
    navigate(`/?${query.toString()}`);
  };

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
