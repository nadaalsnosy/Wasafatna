import { Link } from "react-router-dom";
import { useContext } from "react";

import dateFormat from "dateformat";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

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

const RecipeCard = (props) => {
  let { item } = props;
  const { auth, setAuth } = useAuth();
  // const { setFavourite } = useContext(FilterContext);

  const text = item?.ingredients + item?.instructions;
  const defultText =
    "may this content contains images or videos could help you";

  const addFavourite = async () => {
    console.log(item);

    try {
      const resFiles = await axios.patch(
        `/users/`,
        { userListItem: item._id },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      setAuth({ ...auth, user: resFiles.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-md-0 col-12 col-md-6 col-lg-4 p-3">
      <Card sx={{ maxWidth: 345 }} className="text-center recipe-card m-auto">
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
            <IconButton
              className={
                auth.user?.userList?.find((favItem) => favItem === item._id)
                  ? "text-danger"
                  : ""
              }
              aria-label="add to favorites"
              onClick={addFavourite}
            >
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
            <Typography
              className="card-p"
              variant="body2"
              color="text.secondary"
            >
              {text ? `${text?.substring(0, 200)}...` : defultText}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};
export default RecipeCard;
