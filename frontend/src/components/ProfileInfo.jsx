import { useState, useEffect } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Form } from "react-bootstrap";

const defaultVall = {
  username: "",
  email: "",
  password: "",
};

const ProfileInfo = (props) => {
  const { user } = props;
  const { auth } = useAuth();

  const fakePassword = "***************";
  const emailRGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const passwordRGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  // console.log(user);
  const [editCond, setEditCond] = useState(false);
  const [validated, setValidated] = useState(false);
  const [matchEmail, setMatchEmail] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);

  const [currentUser, setCurrentUser] = useState(user);

  const handleChangeEditCond = () => {
    if (editCond) {
      setEditCond(false);
      setCurrentUser(user);
    } else {
      setEditCond(true);
    }
  };

  useEffect(() => {
    if (user) {
      user.password = fakePassword;
      setCurrentUser(user);
    }
  }, [user]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (emailRGEX.test(value)) {
        setMatchEmail(false);
      } else {
        setMatchEmail(true);
      }
    }
    if (name === "password") {
      if (passwordRGEX.test(value)) {
        setMatchPassword(false);
      } else {
        setMatchPassword(true);
      }
    }
    setCurrentUser((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      if (!matchEmail && !matchPassword) {
        // setEditCond(false);
        saveUser(currentUser);
      }
    } else {
      setValidated(true);
    }
  };

  const saveUser = async (updatedUser) => {
    const formData = new FormData();

    for (const key in updatedUser) {
      if (Object.hasOwnProperty.call(updatedUser, key)) {
        const element = updatedUser[key];

        if (element !== user[key]) {
          formData.append(key, element);
        }
      }
    }

    for (let item of formData) {
      console.log(item);
    }

    const formDataLength = Array.from(formData.keys()).length;
    if (formDataLength !== 0) {
      console.log("goo");
      try {
        const resFiles = await axios.patch(`/users/`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${auth.token}`,
          },
        });
        console.log(resFiles);
        auth.user = resFiles.data;
        localStorage.setItem("user", JSON.stringify(auth));
        setEditCond(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditCond(false);
    }
  };

  return (
    <div className="container me-xl-5 pe-xl-5 my-3">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="container text-start mw-840"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                className="h-90"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="col-4 py-4" component="th" scope="row">
                  User Name
                </TableCell>

                <TableCell className="text-left" align="right">
                  {editCond ? (
                    <Form.Group className={``} controlId={`formGrid-user-name`}>
                      <Form.Control
                        className="passInput fs-7"
                        name="username"
                        type="text"
                        placeholder={`Enter User Name`}
                        value={currentUser?.username}
                        onChange={handleChangeValue}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <p className={`text-capitalize mb-0`}>
                      {currentUser?.username}
                    </p>
                  )}
                </TableCell>
              </TableRow>

              <TableRow
                className="h-90"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="col-4 py-4" component="th" scope="row">
                  Email
                </TableCell>

                <TableCell className="text-left" align="right">
                  {editCond ? (
                    <Form.Group
                      className={``}
                      controlId={`formGrid-user-email`}
                    >
                      <Form.Control
                        className={`passInput fs-7 ${
                          matchEmail && `inputValidation`
                        } `}
                        name="email"
                        type="email"
                        placeholder={`Enter Email`}
                        value={currentUser.email}
                        onChange={handleChangeValue}
                        required
                        aria-describedby="userConfirmPassword"
                      />
                      <Form.Control.Feedback
                        className={`${matchEmail && `d-block`}`}
                        type="invalid"
                      >
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <p className={`text-capitalize mb-0`}>
                      {currentUser?.email}
                    </p>
                  )}
                </TableCell>
              </TableRow>

              <TableRow
                className="h-90"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="col-4 py-4" component="th" scope="row">
                  Password
                </TableCell>

                <TableCell className="text-left" align="right">
                  {editCond ? (
                    <Form.Group
                      className={``}
                      controlId={`formGrid-user-password`}
                    >
                      <Form.Control
                        // className="passInput fs-7"
                        className={`passInput fs-7 ${
                          matchPassword && `inputValidation`
                        } `}
                        name="password"
                        type="password"
                        placeholder={`Enter Password`}
                        value={currentUser.password}
                        onChange={handleChangeValue}
                        required
                        aria-describedby="userConfirmPassword"
                      />
                      <Form.Control.Feedback
                        className={`${matchPassword && `d-block`}`}
                        type="invalid"
                      >
                        Please provide all character types.
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <p className={`text-capitalize mb-0`}>{fakePassword}</p>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {editCond ? (
          <div className="my-3 d-flex gap-2 justify-content-end">
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleChangeEditCond}
            >
              Cancle
            </Button>
          </div>
        ) : (
          <Button
            className="d-block ms-auto my-3 "
            variant="contained"
            color="success"
            onClick={handleChangeEditCond}
          >
            Edit
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ProfileInfo;
