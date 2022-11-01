import dateFormat from "dateformat";
import recipeDefultImg from "../images/foodIcon.png";
import userDefultImg from "../images/userIcon.png";

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
  const text = item?.ingredients + item?.instructions;
  const defultText =
    "may this content contains images or videos could help you";
  return (
    <div className="m-auto m-md-0 col-md-6 col-lg-4 p-3">
      <Card sx={{ maxWidth: 345 }} className="text-center recipe-card">
        <CardHeader
          avatar={
            <Link to={`/userRecipes/${item?.createdBy?._id}`}>
              <Avatar>
                <img
                  className="userImg"
                  src={
                    item?.createdBy?.userImg
                      ? `${process.env.REACT_APP_BASE_URL}${item?.createdBy.userImg}`
                      : userDefultImg
                  }
                  alt="avatar"
                />
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          }
          title={
            <p className="text-capitalize m-0">{item?.createdBy?.username}</p>
          }
          subheader={dateFormat(item?.createdAt, "dd mmmm yyyy")}
        />
        <Link to={`/recipe/${item?._id}`}>
          <CardMedia
            component="img"
            height="194"
            image={
              item?.recipeMainImg
                ? `${process.env.REACT_APP_BASE_URL}${item?.recipeMainImg.imgPath}`
                : recipeDefultImg
            }
            alt={
              item?.recipeMainImg
                ? item.recipeMainImg.imgName
                : "Recipe Main Image"
            }
          />
          <CardContent>
            <h5>{item?.title}</h5>
            <Typography variant="body2" color="text.secondary">
              {text ? `${text?.substring(0, 200)}...` : defultText}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};
export default RecipeCard;
