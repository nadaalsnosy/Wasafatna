import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Button } from "@mui/material";

const ChangePassword = (props) => {
  const { setShow, show, fullscreen } = props;
  const [passwordData, setPasswordData] = useState({});

  const [errorPassword, setErrorPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const passwordRGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "userPassword") {
      if (value.length > 0) {
        setErrorPassword(false);
      } else {
        setErrorPassword(true);
      }
    }

    if (name === "NewPassword") {
      if (passwordRGEX.test(value)) {
        setMatchPassword(false);
      } else {
        setMatchPassword(true);
      }
    }

    if (name === "confirmNewPassword") {
      if (value === passwordData.NewPassword) {
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
    }

    setPasswordData((item) => ({ ...item, [name]: value }));
  };
  console.log(passwordData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordData.userPassword) setErrorPassword(true);
    if (!passwordData.NewPassword) setMatchPassword(true);
    if (!passwordData.confirmNewPassword) setValidPassword(true);

    if (!validPassword && !matchPassword && !errorPassword) {
      console.log("pass");
    }
  };

  return (
    <div>
      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit} className="d-flex flex-column h-100">
          <Modal.Header closeButton>
            <Modal.Title
              className="text-success ms-auto"
              id="contained-modal-title-vcenter"
            >
              Change Password
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="pt-5">
            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                className={`${errorPassword ? "inputValidation" : "passInput"}`}
                type="password"
                placeholder="Enter Password"
                name="userPassword"
                value={passwordData.userPassword}
                onChange={handleChangeValue}
              />
              <p className={`errMsg ${errorPassword ? "shown" : "hidden"}`}>
                please enter valid password!
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                className={`${matchPassword ? "inputValidation" : "passInput"}`}
                type="password"
                placeholder="Enter New Password"
                name="NewPassword"
                value={passwordData.NewPassword}
                onChange={handleChangeValue}
              />
              <p className={`errMsg ${matchPassword ? "shown" : "hidden"}`}>
                please enter valid password!
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridConfirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                className={`${validPassword ? "inputValidation" : "passInput"}`}
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handleChangeValue}
              />
              <p className={`errMsg ${validPassword ? "shown" : "hidden"}`}>
                please enter valid password!
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="my-3 d-flex gap-2 justify-content-end">
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setShow(false)}
              >
                Cancle
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePassword;
