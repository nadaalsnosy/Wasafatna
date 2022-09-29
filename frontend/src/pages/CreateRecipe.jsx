import React, { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import { Form } from "react-bootstrap";
import BackupIcon from "@mui/icons-material/Backup";

const CreateRecipe = () => {
  const [uploadedImgs, setUploadedImgs] = useState([]);

  let fileSelectHandler = (e) => {
    let files = e.target.files;
    let filesArr = Array.from(files);
    // console.log(filesArr);
    let imagesArr = [];
    filesArr.forEach((file) => {
      if (file.type.substr(0, 5) === "image") {
        console.log(file);
        imagesArr.push({
          imgPath: URL.createObjectURL(file),
          imgName: file.name.replace(/[.]/g, "-"),
        });
      }
    });
    console.log(imagesArr);
    setUploadedImgs(imagesArr);
  };
  return (
    <>
      <AnimatedPage>
        <div className="container">
          <h1 className="fs-45 text-start my-5 mx-2 text-success">
            New Recipe
          </h1>
          <div>
            <Form.Group
              className={``}
              // className="mb-4"
              controlId={`formGrid-recipe-title`}
            >
              <Form.Label>Recipe Title</Form.Label>

              <Form.Control
                className="passInput fs-7"
                type="text"
                placeholder={`Enter Your Recipe Tilte`}
                // value={row.value}
                // onChange={(e) => setUserConfirmPassword(e.target.value)}
                required
                aria-describedby="userConfirmPassword"
                // onFocus={() => setConfirmPasswordFocus(true)}
              />
              {/* <p
                     id="userConfirmPassword"
                     // className={`errMsg ${
                     //   confirmPasswordFocus &&
                     //   (!validConfirmPassword || userConfirmPassword === "")
                     //     ? "shown"
                     //     : "hidden"
                     // }`}
                   >
                     Must match your password input!
                   </p> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control className="passInput fs-7" as="textarea" rows={5} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Instructions</Form.Label>
              <Form.Control className="passInput fs-7" as="textarea" rows={5} />
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>
                {/* <div className="uploadIcon"> */}
                <BackupIcon className="uploadIcon" />
                {/* </div> */}
              </Form.Label>
              <Form.Control
                className="d-nonee"
                type="file"
                size="sm"
                onChange={fileSelectHandler}
                multiple
                accept="image/*"
              />
              {uploadedImgs?.map((uploadedImg, i) => (
                <img
                  src={uploadedImg.imgPath}
                  alt={`${uploadedImg.imgName}`}
                  key={i}
                />
              ))}
            </Form.Group>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default CreateRecipe;
