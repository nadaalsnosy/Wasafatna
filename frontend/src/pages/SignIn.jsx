import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  console.log(auth);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, userPassword]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/users/signIn",
        JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
        {
          headers: { "content-type": "application/json" },
        }
      );
      if (res?.data?.status === 500) {
        setErrMsg(res.data.message);
      } else {
        const token = res?.data?.token;
        const user = res?.data?.user;
        if (res.data) {
          setAuth({ token, user });
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        navigate("/home");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.data?.status === 500) {
        setErrMsg("Invalid Email or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Faild");
      }
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <Form className="signForm my-5" onSubmit={handelSubmit}>
          <h1 className="mb-5 fw-bold text-center fs-35 text-success">
            Sign In
          </h1>

          <Form.Group className="mb-4" controlId="formGridEmail">
            <Form.Control
              className={`${errMsg ? "errInput" : "passInput"}`}
              type="email"
              placeholder="Enter Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <p
              id="userEmail"
              className={`errMsg ${errMsg ? "shown" : "hidden"}`}
              aria-live="assertive"
            >
              Invalid Email or Password
            </p>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridPassword">
            <Form.Control
              className={`${errMsg ? "errInput" : "passInput"}`}
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <p
              id="userPassword"
              className={`errMsg ${errMsg ? "shown" : "hidden"} `}
            >
              Invalid Email or Password
            </p>
          </Form.Group>
          <div className="text-end my-5">
            <Button variant="success w-100 fs-5" type="submit">
              sign in
            </Button>
          </div>
          <div className="mt-5">
            New to WasaFatna?{" "}
            <Link className="text-primary text-decoration-none" to={`/signUp`}>
              Sign Up Now.
            </Link>
          </div>
        </Form>
      </div>
      ;
    </>
  );
};

export default SignIn;
