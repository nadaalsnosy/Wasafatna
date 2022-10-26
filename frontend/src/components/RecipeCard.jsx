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

const RecipeCard = (props) => {
  let { item } = props;
  const text = item.ingredients + item.instructions;

  //   content.With supporting text below as a natural lead-in to additional
  //   content.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  //   Nisi quia, quasi error temporibus cumque facere totam excepturi corporis
  //   obcaecati assumenda est tempore deserunt amet sed. Facere, provident?
  //   A architecto unde nisi eius harum numquam voluptates sapiente possimus
  //   explicabo dolore nemo atque ducimus ea, labore voluptatibus excepturi
  //   magni minus ullam. Porro.`;
  return (
    <div className="m-auto m-md-0 col-md-6 col-lg-4 p-3">
      <Link to={`/recipe/${item._id}`}>
        <Card sx={{ maxWidth: 345 }} className="text-center recipe-card">
          <CardHeader
            avatar={
              <Avatar>
                <img
                  className="userImg"
                  src={`${process.env.REACT_APP_BASE_URL}${item.createdBy.userImg}`}
                  alt="avatar"
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            }
            title={item.createdBy.username}
            subheader={item.createdAt}
          />
          <CardMedia
            component="img"
            height="194"
            image={`${process.env.REACT_APP_BASE_URL}${item.recipeMainImg}`}
            alt="Recipe Main Image"
          />
          <CardContent>
            <h5>{item.title}</h5>
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
