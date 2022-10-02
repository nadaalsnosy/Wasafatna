import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Form, Button } from "react-bootstrap";
import BackupIcon from "@mui/icons-material/Backup";

import { MenuItem, FormControl, Select } from "@mui/material";

const CreateRecipe = () => {
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [mainImg, setMainImg] = useState("");

  let mainImgSelectHandeler = (e) => {
    let imgFile = e.target.files[0];

    if (imgFile.type.substr(0, 5) === "image") {
      setMainImg({
        imgPath: URL.createObjectURL(imgFile),
        imgName: imgFile.name.replace(/[.]/g, "-"),
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
          imgName: file.name.replace(/[.]/g, "-"),
        });
      }
    });
    setUploadedImgs(imagesArr);
  };

  let videosSelectHandeler = (e) => {
    let files = e.target.files;
    let filesArr = Array.from(files);
    let videosArr = [];

    filesArr.forEach((file) => {
      if (file.type.substr(0, 5) === "video") {
        videosArr.push({
          videoPath: URL.createObjectURL(file),
          videoName: file.name.replace(/[.]/g, "-"),
        });
      }
    });
    setUploadedVideos(videosArr);
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

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
            className="container text-start"
          >
            <Form.Group className={`mb-5`}>
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control
                className="passInput fs-7"
                type="text"
                placeholder={`Enter Your Recipe Tilte`}
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
                {mainImg && (
                  <img src={mainImg.imgPath} alt={`${mainImg.imgName}`} />
                )}
              </div>
            </Form.Group>

            <Form.Group className={`mb-5`}>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                className="passInput fs-7"
                as="textarea"
                rows={5}
                required
              />
            </Form.Group>

            <Form.Group className={`mb-5`}>
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                className="passInput fs-7"
                as="textarea"
                rows={5}
                required
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
                {uploadedImgs?.map((uploadedImg, i) => (
                  <img
                    src={uploadedImg.imgPath}
                    alt={`${uploadedImg.imgName}`}
                    key={i}
                  />
                ))}
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
                {uploadedVideos?.map((uploadedVideo, i) => (
                  <video controls key={i}>
                    <source src={uploadedVideo.videoPath} type="video/mp4" />
                  </video>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Instructions</Form.Label>
              <FormControl className="d-block">
                <Select
                  className="w-100"
                  // placeholder="lolo"
                  value={age}
                  onChange={handleChange}
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
