import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Form, Button } from "react-bootstrap";
import BackupIcon from "@mui/icons-material/Backup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { MenuItem, FormControl, Select } from "@mui/material";

const CreateRecipe = () => {
  const [mainImg, setMainImg] = useState("");
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  let mainImgSelectHandeler = (e) => {
    let imgFile = e.target.files[0];

    if (imgFile.type.substr(0, 5) === "image") {
      setMainImg({
        imgPath: URL.createObjectURL(imgFile),
        imgName: `${new Date()
          .toISOString()
          .replace(/[./:/-]/g, "")}${imgFile.name.replace(/[.]/g, "-")}`,
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

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const [genre, setGenre] = useState("other");

  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
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
                type="text"
                placeholder={`Enter The Recipe Tilte`}
                required
              />
            </Form.Group>

            <Form.Group className={`mb-5`} controlId="formMainImgFile">
              <p className="form-label">Main Recipe Image</p>
              <Form.Control
                className="d-none"
                type="file"
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
                as="textarea"
                rows={5}
              />
            </Form.Group>

            <Form.Group className={`mb-5`} controlId="formImgsFile">
              <p className="form-label"> Images</p>
              <Form.Control
                className="d-none"
                type="file"
                onChange={imgsSelectHandeler}
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
                onChange={videosSelectHandeler}
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
                  value={genre}
                  onChange={handleChangeGenre}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="desserts">Desserts</MenuItem>
                  <MenuItem value="juices">Juices</MenuItem>
                  <MenuItem value="meals">Meals</MenuItem>
                  <MenuItem value="pastries">Pastries</MenuItem>
                  <MenuItem value="salad">Salad</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Form.Group>

            <div className="text-end">
              <Button variant="success fs-5" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </AnimatedPage>
    </>
  );
};

export default CreateRecipe;
