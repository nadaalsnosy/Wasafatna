import { useState, useRef } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import AnimatedPage from "../components/AnimatedPage";
import ProfileInfo from "../components/ProfileInfo";

import userDefultImg from "../images/userIcon.png";

import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const imgRef = useRef();
  const { auth, setAuth } = useAuth();
  const user = auth?.user;

  const [editCond, setEditCond] = useState(false);
  const [userImg, setUserImg] = useState();

  const userImgSelectHandeler = (e) => {
    const file = e.target.files[0];

    if (file?.type.substr(0, 5) === "image") {
      setUserImg({
        imgPath: URL.createObjectURL(file),
        imgName: `${new Date()
          .toISOString()
          .replace(/[./:/-]/g, "")}${file.name.replace(/[.]/g, "-")}`,
        file: file,
      });
    }
  };

  const handleChangeImgCond = () => {
    imgRef.current.value = "";
    setUserImg("");
  };

  const saveUser = async (updatedUser) => {
    const formData = new FormData();

    if (userImg) formData.append("userImg", userImg.file);

    for (const key in updatedUser) {
      if (Object.hasOwnProperty.call(updatedUser, key)) {
        const element = updatedUser[key];

        if (element !== user[key]) {
          formData.append(key, element);
        }
      }
    }

    const formDataLength = Array.from(formData.keys()).length;
    if (formDataLength !== 0) {
      try {
        const resFiles = await axios.patch(`/users/`, formData, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });

        setAuth({ ...auth, user: resFiles.data });
        imgRef.current.value = "";
        setUserImg("");
        setEditCond(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditCond(false);
    }
  };

  return (
    <>
      <AnimatedPage>
        <div className="container">
          <h1 className="fs-45 text-start my-5 mx-2 text-success">
            My Profile
          </h1>
          <div className="d-md-flex flex-row-reverse my-5 gap-5 gap-xl-5 mx-xl-5">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                saveUser();
              }}
            >
              <div>
                <div
                  className={`position-relative fit-content m-auto my-3 mb-md-3 ps-xl-5 ${
                    !userImg && `mb-100`
                  }`}
                >
                  <Form.Group controlId="formUserImg">
                    <div className="rounded-circle overflow-h profile-img-container border border-success">
                      <img
                        className="userImg"
                        src={
                          userImg
                            ? `${userImg?.imgPath}`
                            : user?.userImg
                            ? `${process.env.REACT_APP_BASE_URL}${user.userImg}`
                            : userDefultImg
                        }
                        alt="userImg"
                      />
                    </div>
                    <Form.Control
                      ref={imgRef}
                      className="d-none"
                      type="file"
                      name="userImg"
                      onChange={userImgSelectHandeler}
                      accept="image/*"
                    />
                    <Form.Label className="edit-container">
                      <EditIcon />
                    </Form.Label>
                  </Form.Group>
                </div>
                {userImg && (
                  <div className="my-3 d-flex gap-2 justify-content-end mb-5 me-5 me-md-2 mt-md-4">
                    <Button variant="contained" color="success" type="submit">
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleChangeImgCond}
                    >
                      Cancle
                    </Button>
                  </div>
                )}
              </div>
            </Form>

            <ProfileInfo
              user={user}
              saveUser={saveUser}
              editCond={editCond}
              setEditCond={setEditCond}
            />
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Profile;
