import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../images/image1.jpg";
import img2 from "../images/image2.jpg";

const RecipeCard = () => {
  let text = `With supporting text below as a natural lead-in to additional
    content.With supporting text below as a natural lead-in to additional
    content.`;
  return (
    <>
      <div className="m-auto col-lg-6 p-3">
        <Link to={'recipe'}>
          <Card className="text-center recipe-card">
            <Card.Header className="light-red">
              <div className="d-flex justify-content-center justify-content-md-start">
                <div className="userImgContainer">
                  <img className="userImg" src={img2} alt="avatar" />
                </div>
                <p className="m-0 text-black">User Name</p>
              </div>
            </Card.Header>
            <Card.Body className="d-md-flex">
              <div className="recipeImgContainer">
                <img src={img1} alt="img1" />
              </div>
              <div className="m-auto">
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>{`${text.substring(0, 40)}.....`}</Card.Text>
              </div>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Footer className="text-muted light-red">
              2 days ago
            </Card.Footer>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default RecipeCard;
