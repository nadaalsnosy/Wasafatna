import React from "react";
import AnimatedPage from "../components/AnimatedPage";
import ProfileInfo from "../components/ProfileInfo";
import img3 from "../images/image3.jpg";
import EditIcon from "@mui/icons-material/Edit";
const Profile = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container">
          <h1 className="fs-45 text-start my-5 mx-2 text-success">My Profile</h1>
          <div className="d-md-flex flex-row-reverse my-5 gap-5 gap-xl-5 mx-xl-5">
            {/* <div> */}
            <div className=" position-relative fit-content m-auto my-3 mb-5 mb-md-3 ps-xl-5">
              <div className="rounded-circle overflow-h profile-img-container">
                <img src={img3} alt="avatar" />
              </div>
              <div className="edit-container">
                <EditIcon />
              </div>
            </div>
            {/* </div> */}
            {/* <div> */}
            <ProfileInfo />
            {/* </div> */}
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default Profile;
