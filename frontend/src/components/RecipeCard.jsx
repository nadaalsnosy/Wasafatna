import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import img1 from "../images/image1.jpg";
import img2 from "../images/image2.jpg";

const RecipeCard = () => {
  let text = `With supporting text below as a natural lead-in to additional
    content.With supporting text below as a natural lead-in to additional
    content.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Nisi quia, quasi error temporibus cumque facere totam excepturi corporis
    obcaecati assumenda est tempore deserunt amet sed. Facere, provident?
    A architecto unde nisi eius harum numquam voluptates sapiente possimus
    explicabo dolore nemo atque ducimus ea, labore voluptatibus excepturi
    magni minus ullam. Porro.`;
  return (
    <div className="m-auto m-md-0 col-md-6 col-lg-4 p-3">
      <Link to={"recipe"}>
        <Card sx={{ maxWidth: 345 }} className="text-center recipe-card">
          <CardHeader
            avatar={
              <Avatar>
                <img className="userImg" src={img2} alt="avatar" />
              </Avatar>
            }
            action={
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image={img1}
            alt="Paella dish"
          />
          <CardContent>
            <h5>Recipe Name</h5>
            <Typography variant="body2" color="text.secondary">
              {text.substring(0, 200)}....
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
export default RecipeCard;
