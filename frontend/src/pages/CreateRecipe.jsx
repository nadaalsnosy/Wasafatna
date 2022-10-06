import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Form } from "react-bootstrap";
import { MenuItem, FormControl, Select, Button } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { RecipesContext } from "../context/RecipesModule";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

import AnimatedPage from "../components/AnimatedPage";

const defaultRecipe = {
  // _id: "",
  title: "",
  ingredients: "",
  instructions: "",
  // recipesImgs: "",
  // recipesVideos: "",
  genre: "",
};
const CreateRecipe = () => {
  const [mainImg, setMainImg] = useState();
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [validated, setValidated] = useState(false);
  // const [genre, setGenre] = useState("");

  const { setRecipes, getRecipes, recipes } = useContext(RecipesContext);
  const { auth } = useAuth();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [currentRecipe, setCurrentRecipe] = useState(defaultRecipe || recipe);

  useEffect(() => {
    if (recipes?.length) {
      setRecipe(recipes.find((item) => item._id === id));
    }
  }, [id, recipes]);

  // useEffect(() => {
  //   setCurrentRecipe(recipe || defaultRecipe);
  // }, [recipe]);

  let mainImgSelectHandeler = (e) => {
    let imgFile = e.target.files[0];

    if (imgFile.type.substr(0, 5) === "image") {
      setMainImg({
        imgPath: URL.createObjectURL(imgFile),
        imgName: `${new Date()
          .toISOString()
          .replace(/[./:/-]/g, "")}${imgFile.name.replace(/[.]/g, "-")}`,
        file: imgFile,
      });
    }
  };

  let imgsSelectHandeler = (e) => {
    let files = e.target.files;
    let filesArr = Array.from(files);
    let imagesArr = [];

    filesArr.forEach((file) => {
      if (file.type.substr(0, 5) === "image") {
        imagesArr.push({
          imgPath: URL.createObjectURL(file),
          imgName: `${new Date()
            .toISOString()
            .replace(/[./:/-]/g, "")}${file.name.replace(/[.]/g, "-")}`,
          file: file,
        });
      }
    });
    if (uploadedImgs.length === 0) {
      setUploadedImgs(imagesArr);
    } else {
      setUploadedImgs([...uploadedImgs, ...imagesArr]);
    }
  };

  let videosSelectHandeler = (e) => {
    let files = e.target.files;
    let filesArr = Array.from(files);
    let videosArr = [];

    filesArr.forEach((file) => {
      if (file.type.substr(0, 5) === "video") {
        videosArr.push({
          videoPath: URL.createObjectURL(file),
          videoName: `${new Date()
            .toISOString()
            .replace(/[./:/-]/g, "")}${file.name.replace(/[.]/g, "-")}`,
          file: file,
        });
      }
    });
    if (uploadedVideos.length === 0) {
      setUploadedVideos(videosArr);
    } else {
      setUploadedVideos([...uploadedVideos, ...videosArr]);
    }
  };

  let deleteImageHandler = (imgName) => {
    let newImages = uploadedImgs.filter((item) => {
      return item.imgName !== imgName;
    });
    setUploadedImgs(newImages);
  };

  let deleteVideoHandler = (videoName) => {
    let newVideos = uploadedVideos.filter((item) => {
      return item.videoName !== videoName;
    });
    setUploadedVideos(newVideos);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      console.log(currentRecipe);
      addRecipe(currentRecipe);
    } else {
      setValidated(true);
    }
  };
  let formData = new FormData();

  const handleChangeValue = (e) => {
    let { name, value, files } = e.target;

    // console.log(e.target.files);
    if (files) {
      formData.append("images", { mainImg: files });
      console.log(formData);
      console.log(Array.from(formData));
      // reader.onload = () =>{

      // }
      // setCurrentRecipe((item) => ({ ...item, [name]: filesValue }));
    } else {
      setCurrentRecipe((item) => ({ ...item, [name]: value }));
    }
  };

  const addRecipe = async (recipe) => {
    const formData = new FormData();
    if (mainImg) formData.append("mainImg", mainImg.file);

    if (uploadedImgs) {
      for (let i = 0; i < uploadedImgs.length; i++) {
        formData.append("uploadedImgs", uploadedImgs[i].file);
      }
    }

    if (uploadedVideos) {
      for (let i = 0; i < uploadedVideos.length; i++) {
        formData.append("uploadedVideos", uploadedVideos[i].file);
      }
    }

    for (const key in recipe) {
      if (Object.hasOwnProperty.call(recipe, key)) {
        const element = recipe[key];
        formData.append(key, element);
      }
    }
    for (let item of formData) {
      console.log(item);
    }

    try {
      // const res = await axios.post(
      //   "/recipes/62fd90c4eb21e594a0f45bc9",
      //   JSON.stringify({
      //     title: recipe.title,
      //     mainImg: recipe.mainImg,
      //     ingredients: recipe.ingredients,
      //     instructions: recipe.instructions,
      //     recipesImgs: recipe.recipesImgs,
      //     recipesVideos: recipe.recipesVideos,
      //     genre: recipe.genre,
      //   }),
      //   {
      //     headers: {
      //       "content-type": "application/json",
      //       Authorization: `${auth.token}`,
      //     },
      //   }
      // );
      const resFiles = await axios.post(
        "/recipes/62fd90c4eb21e594a0f45bc9",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            // "content-type": "application/json",
            Authorization: `${auth.token}`,
          },
        }
      );
      console.log(resFiles);
      setRecipes((recipes) => [...recipes, { ...recipe }]);
      console.log(recipes);
      // getRecipes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <h1 className="fs-45 text-start my-5 mx-2 text-success">
            New Recipe
          </h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="container text-start mw-840"
          >
            <Form.Group className={`mb-5`}>
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control
                className="passInput fs-7"
                placeholder={`Enter The Recipe Tilte`}
                type="text"
                name="title"
                value={currentRecipe.title}
                onChange={handleChangeValue}
                required
              />
            </Form.Group>

            <Form.Group className={`mb-5`} controlId="formMainImgFile">
              <p className="form-label">Main Recipe Image</p>
              <Form.Control
                className="d-none"
                type="file"
                name="mainImg"
                // value={currentRecipe.mainImg}
                onChange={mainImgSelectHandeler}
                accept="image/*"
              />
              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>
                {mainImg ? (
                  <img src={mainImg.imgPath} alt={`${mainImg.imgName}`} />
                ) : (
                  <p className="fs-7 inputPlaceholder">
                    Choose The Recipe Main Image ...
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className={`mb-5`}>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleChangeValue}
                placeholder={`Enter The Recipe Ingredients ...`}
                className="passInput fs-7"
                as="textarea"
                rows={5}
              />
            </Form.Group>

            <Form.Group className={`mb-5`}>
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                placeholder={`Enter The Recipe Instructions ...`}
                className="passInput fs-7"
                name="instructions"
                value={currentRecipe.instructions}
                onChange={handleChangeValue}
                as="textarea"
                rows={5}
              />
            </Form.Group>

            <Form.Group className={`mb-5`} controlId="formImgsFile">
              <p className="form-label"> Images</p>
              <Form.Control
                className="d-none"
                type="file"
                name="recipesImgs"
                onChange={imgsSelectHandeler}
                // value={currentRecipe.recipesImgs}
                // onChange={(e) => {
                //   imgsSelectHandeler(e);
                //   handleChangeValue(e);
                // }}
                multiple
                accept="image/*"
              />

              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>
                {uploadedImgs.length !== 0 ? (
                  uploadedImgs.map((uploadedImg, i) => (
                    <div
                      className="d-inline-block position-relative"
                      key={uploadedImg.imgName}
                    >
                      <span className="position-absolute deleteIcon">
                        <HighlightOffIcon
                          onClick={() =>
                            deleteImageHandler(uploadedImg.imgName)
                          }
                          color="error"
                          className="bg-light-yellow rounded-circle"
                        />
                      </span>
                      <img
                        src={uploadedImg.imgPath}
                        alt={`${uploadedImg.imgName}`}
                      />
                    </div>
                  ))
                ) : (
                  <p className="fs-7 inputPlaceholder">
                    Choose The Recipe Images ...
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className={`mb-5`} controlId="formVideosFile">
              <p className="form-label"> Videos</p>
              <Form.Control
                className="d-none"
                type="file"
                name="recipesVideos"
                onChange={videosSelectHandeler}
                // value={currentRecipe.recipesVideos}
                // onChange={(e) => {
                //   videosSelectHandeler(e);
                //   handleChangeValue(e);
                // }}
                multiple
                accept="video/*"
              />

              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>
                {uploadedVideos.length !== 0 ? (
                  uploadedVideos.map((uploadedVideo) => (
                    <div
                      className="d-inline-block position-relative"
                      key={uploadedVideo.videoName}
                    >
                      <span className="position-absolute deleteIcon">
                        <HighlightOffIcon
                          onClick={() =>
                            deleteVideoHandler(uploadedVideo.videoName)
                          }
                          color="error"
                          className="bg-light-yellow rounded-circle"
                        />
                      </span>
                      <video controls key={uploadedVideo.videoName}>
                        <source
                          src={uploadedVideo.videoPath}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ))
                ) : (
                  <p className="fs-7 inputPlaceholder">
                    Choose The Recipe Videos ...
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className={`mb-5`}>
              <Form.Label>Genre</Form.Label>
              <FormControl className="d-block">
                <Select
                  className="w-100"
                  name="genre"
                  // value={defaultRecipe.genre}
                  value={currentRecipe.genre}
                  onChange={handleChangeValue}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="desserts">Desserts</MenuItem>
                  <MenuItem value="juices">Juices</MenuItem>
                  <MenuItem value="meals">Meals</MenuItem>
                  <MenuItem value="pastries">Pastries</MenuItem>
                  <MenuItem value="salad">Salad</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Form.Group>

            <div className="my-3 d-flex gap-2 justify-content-end">
              <Button
                // className="d-block ms-auto my-3 "
                variant="contained"
                color="success"
                type="submit"
                // onClick={handleChangeEditCond}
              >
                Save
              </Button>
              <Link to={"/"}>
                <Button
                  // className="d-block ms-auto my-3 "
                  variant="contained"
                  color="error"
                  // onClick={handleChangeEditCond}
                >
                  Cancle
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </AnimatedPage>
    </>
  );
};

export default CreateRecipe;
