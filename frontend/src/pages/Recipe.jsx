import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

import { Button, CardHeader, Avatar } from "@mui/material";

import axios from "../api/axios";
import AnimatedPage from "../components/AnimatedPage";

// import MainImg from "../images/foodIcon.png";
// import TestVideo from "../images/testVideo.mp4";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();

  const getRecipe = async () => {
    try {
      const res = await axios.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(recipe);
  console.log(recipe?.recipesVideos.length);

  useEffect(() => {
    getRecipe();
  }, []);

  console.log(id);
  return (
    <>
      <AnimatedPage>
        <div className="container max-w-900">
          <p className="my-3 text-start ms-2">
            <Link className="text-placeholder" to={"/"}>
              Home
            </Link>{" "}
            /{" "}
            <Link className="text-placeholder text-capitalize" to={"/"}>
              {recipe?.genre}
            </Link>
          </p>
          <CardHeader
            className="recipeUserInfo"
            avatar={
              <Avatar>
                <img
                  className="userImg"
                  src={`${process.env.REACT_APP_BASE_URL}${recipe?.createdBy.userImg}`}
                  alt="avatar"
                />
              </Avatar>
            }
            title={recipe?.createdBy.username}
            subheader={dateFormat(recipe?.createdAt, "dd mmmm yyyy")}
          />
          <h1 className="fs-1 text-center mt-4 mb-3 mx-2 text-capitalize text-success">
            {recipe?.title}
          </h1>
          <img
            className="max-h-400"
            src={`${process.env.REACT_APP_BASE_URL}${recipe?.recipeMainImg}`}
            alt={recipe?.recipeMainImg.substring(14).replace(/[.]/g, "")}
          />
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Ingredients
          </h2>
          <p className="text-start">
            {recipe?.ingredients
              ? recipe.ingredients
              : "No ingredients specified"}
          </p>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Instructions
          </h2>
          <p className="text-start">
            {recipe?.instructions
              ? recipe.instructions
              : "No instructions specified"}
          </p>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Images
          </h2>
          {recipe?.recipesImgs.length ? (
            <>
              <div className="d-flex flex-wrap">
                {recipe.recipesImgs.map((itemImg) => (
                  <div className="col-12 col-md-6 p-2 h-280" key={itemImg}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${itemImg}`}
                      alt={itemImg.substring(14).replace(/[.]/g, "")}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-start">No Images have been added</p>
          )}
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Videos
          </h2>
          {recipe?.recipesVideos.length ? (
            <>
              <div className="d-flex flex-wrap">
                {recipe.recipesVideos.map((itemVideo) => (
                  <div className="col-12 col-md-6 p-2 h-280" key={itemVideo}>
                    <video controls>
                      <source
                        src={`${process.env.REACT_APP_BASE_URL}${itemVideo}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-start">No Videos have been added</p>
          )}

          <Link to={`/editRecipe/${recipe?._id}`}>
            <Button
              className="d-block ms-auto me-3 my-3 "
              variant="contained"
              color="success"
              // onClick={handleChangeEditCond}
            >
              Edit
            </Button>
          </Link>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Recipe;
