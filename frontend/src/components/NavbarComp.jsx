import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../images/wasafatnaCircle.png";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

const NavbarComp = () => {
  const UserInfo = (
    <div className="d-flex">
      <p className="m-0">User Name</p>
      <div className="userImgContainer">
        <img className="userImg" src={Logo} alt="avatar" />
      </div>
    </div>
  );

  return (
    <>
      <Navbar className="bg-light-warning sticky-top" bg="light" expand="lg">
        <Container className="flex-nowrap d-block d-lg-flex">
          <div className="d-flex justify-content-between flex-grow-1">
            <Navbar.Brand className="pt-0">
              <Link to={"/home"}>
                <p className="text-success m-0 font-weight-bold fs-3">
                  wasa<span className="text-danger fs-2">F</span>atna
                </p>
              </Link>
            </Navbar.Brand>

            <Form className="d-flex position-relative max-w-300 align-items-center flex-grow-1">
              <FormControl
                type="text"
                // value={keyword}
                // ref={searchRef}
                // onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Recipes "
                className="me-2 searchInput"
                aria-label="Search"
              />
              {/* <Link to={`/search/:${keyword}`}> */}
              <SearchOutlinedIcon className="icon position-absolute right-15 text-success" />
              {/* </Link> */}
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Link className="nav-link" to={"/api/signIn"}>
                Sign In
              </Link>
              <Link className="nav-link" to={"/api/signUp"}>
                Sign Up
              </Link>

              <NavDropdown
                title={UserInfo}
                className="ms-3"
                id="basic-nav-dropdown"
              >
                <div className="text-center text-lg-start">
                  <Link className="dropdown-item" to={"profile"}>
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to={"favourite"}>
                    Favourite
                  </Link>
                  <Link className="dropdown-item" to={"myRecipes"}>
                    My Recipes
                  </Link>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Sign Out
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
