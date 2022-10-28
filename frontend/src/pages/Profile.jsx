import { useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import ProfileInfo from "../components/ProfileInfo";

import userDefultImg from "../images/userIcon.png";
import useAuth from "../hooks/useAuth";
import { Form } from "react-bootstrap";

import EditIcon from "@mui/icons-material/Edit";
const Profile = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  // console.log(user);

  const [userImg, setUserImg] = useState();
  // console.log(userImg);

  const userImgSelectHandeler = (e) => {
    const file = e.target.files[0];
    console.log(e);
    console.log(userImg);

    if (file.type.substr(0, 5) === "image") {
      setUserImg({
        imgPath: URL.createObjectURL(file),
        imgName: `${new Date()
          .toISOString()
          .replace(/[./:/-]/g, "")}${file.name.replace(/[.]/g, "-")}`,
        file: file,
      });
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
            {/* <div> */}
            <div className=" position-relative fit-content m-auto my-3 mb-5 mb-md-3 ps-xl-5">
              <Form.Group controlId="formUserImg">
                <div className="rounded-circle overflow-h profile-img-container border border-success">
                  {/* <img src={userDefultImg} alt="avatar" /> */}
                  <img
                    className="userImg"
                    src={userImg ? `${userImg?.imgPath}` : userDefultImg}
                    alt="userImg"
                  />
                </div>
                <Form.Control
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
            {/* </div> */}
            {/* <div> */}
            <ProfileInfo user={user} />
            {/* </div> */}
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Profile;
