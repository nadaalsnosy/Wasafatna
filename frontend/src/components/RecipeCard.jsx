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
    content.`;
  return (
    <div className="m-auto col-md-6 col-lg-4 p-3">
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
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
export default RecipeCard;
