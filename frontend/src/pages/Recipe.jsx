import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import MainImg from "../images/foodIcon.png";
import TestVideo from "../images/testVideo.mp4";

const Recipe = () => {
  console.log(MainImg);
  return (
    <>
      <AnimatedPage>
        <div className="container max-w-900">
          <p className="my-3 text-start ms-2">
            <Link className="text-placeholder" to={"/"}>
              Home
            </Link>{" "}
            /{" "}
            <Link className="text-placeholder" to={"/"}>
              Genre
            </Link>
          </p>
          <h1 className="fs-1 text-start mt-4 mb-5 mx-2 text-success">
            Recipe Title
          </h1>
          <img
            className="max-w-460"
            src={MainImg}
            alt={MainImg.substring(14).replace(/[.]/g, "")}
          />
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Ingredients
          </h2>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            culpa eos cupiditate explicabo, non aperiam dolorem error? Quia quos
            sunt repellendus nobis? Nulla non dolore earum, nesciunt sed magni
            ut tempora rem minima enim dolorum, cumque porro explicabo modi,
            magnam maiores in deleniti necessitatibus? Quibusdam eligendi
            temporibus non distinctio quos?
          </p>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Instructions
          </h2>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            culpa eos cupiditate explicabo, non aperiam dolorem error? Quia quos
            sunt repellendus nobis? Nulla non dolore earum, nesciunt sed magni
            ut tempora rem minima enim dolorum, cumque porro explicabo modi,
            magnam maiores in deleniti necessitatibus? Quibusdam eligendi
            temporibus non distinctio quos?
          </p>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Images
          </h2>
          <div className="d-flex flex-wrap">
            <div className="col-md-6 p-2">
              <img
                src={MainImg}
                alt={MainImg.substring(14).replace(/[.]/g, "")}
              />
            </div>
            <div className="col-md-6 p-2">
              <img
                src={MainImg}
                alt={MainImg.substring(14).replace(/[.]/g, "")}
              />
            </div>
            <div className="col-md-6 p-2">
              <img
                src={MainImg}
                alt={MainImg.substring(14).replace(/[.]/g, "")}
              />
            </div>
            <div className="col-md-6 p-2">
              <img
                src={MainImg}
                alt={MainImg.substring(14).replace(/[.]/g, "")}
              />
            </div>
          </div>
          <h2 className="fs-3 text-start mt-5 mb-3 mx-2 text-success">
            Videos
          </h2>
          <div className="d-flex flex-wrap">
            <div className="col-12 col-md-6 p-2">
              <video controls>
                <source src={TestVideo} type="video/mp4" />
              </video>
            </div>
            <div className="col-12 col-md-6 p-2">
              <video controls>
                <source src={TestVideo} type="video/mp4" />
              </video>
            </div>
            <div className="col-12 col-md-6 p-2">
              <video controls>
                <source src={TestVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <Link to={"/editRecipe/id"}>
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
