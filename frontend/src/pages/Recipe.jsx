import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";

import { Button, CardHeader, Avatar } from "@mui/material";

import useAuth from "../hooks/useAuth";
import AnimatedPage from "../components/AnimatedPage";
import { RecipesContext } from "../context/RecipesModule";

import recipeDefultImg from "../images/foodIcon.png";
import userDefultImg from "../images/userIcon.png";

const Recipe = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const { recipe, getRecipe } = useContext(RecipesContext);

  useEffect(() => {
    getRecipe(id);
  }, []);

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
              <Link to={`/userRecipes/${recipe?.createdBy?._id}`}>
                <Avatar>
                  <img
                    className="userImg"
                    src={
                      recipe?.createdBy?.userImg
                        ? `${process.env.REACT_APP_BASE_URL}${recipe?.createdBy.userImg}`
                        : userDefultImg
                    }
                    alt="avatar"
                  />
                </Avatar>
              </Link>
            }
            title={recipe?.createdBy?.username}
            subheader={dateFormat(recipe?.createdAt, "dd mmmm yyyy")}
          />
          <h1 className="fs-1 text-center mt-4 mb-3 mx-2 text-capitalize text-success">
            {recipe?.title}
          </h1>
          <img
            className="max-h-400 border-green-5"
            src={
              recipe?.recipeMainImg
                ? `${process.env.REACT_APP_BASE_URL}${recipe?.recipeMainImg.imgPath}`
                : recipeDefultImg
            }
            alt="Recipe MainImage"
          />
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Ingredients
          </h2>
          <pre className="text-start fs-6">
            {recipe?.ingredients
              ? recipe.ingredients
                  .replace(/^/, `\u2022 `)
                  .replace(/\r\n/g, "\r\n\u2022 ")
              : "No ingredients specified"}
          </pre>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Instructions
          </h2>
          <pre className="text-start fs-6">
            {recipe?.instructions
              ? recipe.instructions
                  .replace(/^/, `\u2022 `)
                  .replace(/\r\n/g, "\r\n\u2022 ")
              : "No instructions specified"}
          </pre>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Images
          </h2>
          {recipe?.recipeImgs?.length ? (
            <>
              <div className="d-flex flex-wrap">
                {recipe.recipeImgs.map((item) => (
                  <div className="col-12 col-md-6 p-2 h-280" key={item.imgPath}>
                    <img
                      className="border-green-5 h-100"
                      src={`${process.env.REACT_APP_BASE_URL}${item.imgPath}`}
                      alt={item.imgName.substring(14).replace(/[.]/g, "")}
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
          {recipe?.recipeVideos?.length ? (
            <>
              <div className="d-flex flex-wrap">
                {recipe.recipeVideos.map((item) => (
                  <div
                    className="col-12 col-md-6 p-2 h-280"
                    key={item.videoPath}
                  >
                    <video className="border-green-5 h-100" controls>
                      <source
                        src={`${process.env.REACT_APP_BASE_URL}${item.videoPath}`}
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
          {auth?.user?._id === recipe?.createdBy?._id && (
            <div className="my-3 d-flex gap-2 justify-content-end">
              <Link to={`/editRecipe/${recipe?._id}`}>
                <Button
                  className="ms-auto me-3 my-3 "
                  variant="contained"
                  color="success"
                >
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </AnimatedPage>
    </>
  );
};

export default Recipe;
