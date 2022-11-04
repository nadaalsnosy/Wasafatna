import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import { MenuItem, FormControl, Select, Button } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import AnimatedPage from "../components/AnimatedPage";
import { RecipesModule } from "../context/RecipesModule";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const defaultRecipe = {
  title: "",
  ingredients: "",
  instructions: "",
  genre: "others",
};
const SaveRecipe = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainImg, setMainImg] = useState();
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [deleteImgs, setDeleteImgs] = useState([]);
  const [deleteVideos, setDeleteVideos] = useState([]);
  const [validated, setValidated] = useState(false);

  const { setRecipes, setRecipe, recipe, getRecipe } =
    useContext(RecipesModule);

  const [currentRecipe, setCurrentRecipe] = useState(defaultRecipe);

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setCurrentRecipe(defaultRecipe);
    } else {
      if (recipe) {
        setCurrentRecipe(recipe);
        if (!mainImg) {
          setMainImg(recipe.recipeMainImg);
        }
        if (uploadedImgs?.length === 0) {
          setUploadedImgs(recipe.recipeImgs);
        }
        if (uploadedVideos?.length === 0) {
          setUploadedVideos(recipe.recipeVideos);
        }
      }
    }
  }, [recipe]);

  const mainImgSelectHandeler = (e) => {
    const file = e.target.files[0];

    if (file.type.substr(0, 5) === "image") {
      setMainImg({
        imgPath: URL.createObjectURL(file),
        imgName: `${new Date()
          .toISOString()
          .replace(/[./:/-]/g, "")}${file.name.replace(/[.]/g, "-")}`,
        file: file,
      });
    }
  };

  const imgsSelectHandeler = (e) => {
    const files = e.target.files;
    const filesArr = Array.from(files);
    const imagesArr = [];

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
    if (uploadedImgs?.length === 0) {
      setUploadedImgs(imagesArr);
    } else {
      setUploadedImgs([...uploadedImgs, ...imagesArr]);
    }
  };

  const videosSelectHandeler = (e) => {
    const files = e.target.files;
    const filesArr = Array.from(files);
    const videosArr = [];

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
    if (uploadedVideos?.length === 0) {
      setUploadedVideos(videosArr);
    } else {
      setUploadedVideos([...uploadedVideos, ...videosArr]);
    }
  };

  const resetRecipe = () => {
    setCurrentRecipe(defaultRecipe);
    if (id) {
      navigate(`/recipe/${id}`);
    } else {
      navigate(`/userRecipes/${auth.user._id}`);
    }
  };

  const deleteImageHandler = (delFile) => {
    if (!delFile.file) {
      setDeleteImgs([...deleteImgs, delFile.imgName]);
    }
    const newImages = uploadedImgs.filter((item) => {
      return item.imgName !== delFile.imgName;
    });
    setUploadedImgs(newImages);
  };

  const deleteVideoHandler = (delFile) => {
    if (!delFile.file) {
      setDeleteVideos([...deleteVideos, delFile.videoName]);
    }
    const newVideos = uploadedVideos.filter((item) => {
      return item.videoName !== delFile.videoName;
    });
    setUploadedVideos(newVideos);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      saveRecipe(currentRecipe);
    } else {
      setValidated(true);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setCurrentRecipe((item) => ({ ...item, [name]: value }));
  };

  const saveRecipe = async (newRecipe) => {
    const formData = new FormData();

    if (mainImg) formData.append("mainImg", mainImg.file);

    if (uploadedImgs) {
      for (let i = 0; i < uploadedImgs?.length; i++) {
        formData.append("uploadedImgs", uploadedImgs[i].file);
      }
    }

    if (deleteImgs) {
      for (let i = 0; i < deleteImgs?.length; i++) {
        formData.append("deleteImgs", deleteImgs[i]);
      }
    }

    if (uploadedVideos) {
      for (let i = 0; i < uploadedVideos?.length; i++) {
        formData.append("uploadedVideos", uploadedVideos[i].file);
      }
    }

    if (deleteVideos) {
      for (let i = 0; i < deleteVideos?.length; i++) {
        formData.append("deleteVideos", deleteVideos[i]);
      }
    }

    for (const key in newRecipe) {
      if (Object.hasOwnProperty.call(newRecipe, key)) {
        const element = newRecipe[key];
        if (id) {
          if (element !== recipe[key]) {
            formData.append(key, element);
          }
        } else {
          formData.append(key, element);
        }
      }
    }

    if (id) {
      try {
        const resFiles = await axios.patch(`/recipes/${id}`, formData, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        console.log(resFiles);
        setRecipe(resFiles);
        setRecipes((currentRecipes) => {
          const recipeIndex = currentRecipes.findIndex(
            (item) => item._id === recipe._id
          );
          currentRecipes.splice(recipeIndex, 1, recipe);
          return [...currentRecipes];
        });
        resetRecipe();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resFiles = await axios.post("/recipes", formData, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        console.log(resFiles);
        setRecipes((recipes) => [...recipes, { ...recipe }]);
        resetRecipe();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <h1 className="fs-45 text-start my-5 mx-2 text-success">
            {id ? "Edit Recipe" : "New Recipe"}
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
              <p className="form-label">Recipe Main Image</p>
              <Form.Control
                className="d-none"
                type="file"
                name="mainImg"
                onChange={mainImgSelectHandeler}
                accept="image/*"
              />
              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>
                {mainImg?.imgPath ? (
                  <img
                    src={`${
                      mainImg.file
                        ? mainImg.imgPath
                        : `${process.env.REACT_APP_BASE_URL}${currentRecipe.recipeMainImg.imgPath}`
                    }`}
                    alt={`${
                      mainImg.file
                        ? mainImg.imgName
                        : currentRecipe.recipeMainImg.imgName
                    }`}
                  />
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
                multiple
                accept="image/*"
              />

              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>

                {uploadedImgs?.length !== 0 ? (
                  uploadedImgs?.map((uploadedImg, i) => (
                    <div
                      className="d-inline-block position-relative"
                      key={`${
                        uploadedImg.imgPath ? uploadedImg.imgName : uploadedImg
                      }`}
                    >
                      <span className="position-absolute deleteIcon">
                        <HighlightOffIcon
                          onClick={(e) => deleteImageHandler(uploadedImg)}
                          color="error"
                          className="bg-light-yellow rounded-circle"
                        />
                      </span>
                      <img
                        src={`${
                          uploadedImg.file
                            ? uploadedImg.imgPath
                            : `${process.env.REACT_APP_BASE_URL}${uploadedImg.imgPath}`
                        }`}
                        alt={`${
                          uploadedImg.file
                            ? uploadedImg.imgName
                            : uploadedImg.imgName
                        }`}
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
                multiple
                accept="video/*"
              />

              <div className="uploaded-files position-relative">
                <Form.Label className="uploadIconLable">
                  <BackupIcon className="uploadIcon" />
                </Form.Label>

                {uploadedVideos?.length !== 0 ? (
                  uploadedVideos?.map((uploadedVideo) => (
                    <div
                      className="d-inline-block position-relative"
                      key={uploadedVideo.videoName}
                    >
                      <span className="position-absolute deleteIcon">
                        <HighlightOffIcon
                          onClick={() => deleteVideoHandler(uploadedVideo)}
                          color="error"
                          className="bg-light-yellow rounded-circle"
                        />
                      </span>
                      <video controls key={uploadedVideo.videoName}>
                        <source
                          src={`${
                            uploadedVideo.file
                              ? uploadedVideo.videoPath
                              : `${process.env.REACT_APP_BASE_URL}${uploadedVideo.videoPath}`
                          }`}
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
              <FormControl className="d-block selectInput">
                <Select
                  className="w-100"
                  name="genre"
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
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
              <Button variant="contained" color="error" onClick={resetRecipe}>
                Cancle
              </Button>
            </div>
          </Form>
        </div>
      </AnimatedPage>
    </>
  );
};

export default SaveRecipe;
