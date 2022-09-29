import React from "react";
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
import { useState, useEffect } from "react";

const ProfileInfo = () => {
  let [editCond, setEditCond] = useState(false);

  function createData(property, value) {
    return { property, value };
  }

  let handleChangeEditCond = () => {
    if (editCond) {
      setEditCond(false);
    } else {
      setEditCond(true);
    }
  };
  // useEffect(() => {}, [editCond]);

  const rows = [
    createData("User Name", "data of user"),
    createData("Email", "data of user"),
    createData("Password", "data of user"),
  ];
  return (
    <div className="container me-xl-5 pe-xl-5 my-3">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.property}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="col-4 py-4" component="th" scope="row">
                  {row.property}
                </TableCell>

                <TableCell className="text-left" align="right">
                  {editCond ? (
                    <Form.Group
                      className={``}
                      // className="mb-4"
                      controlId={`formGrid-${row.property}`}
                    >
                      <Form.Control
                        className="passInput fs-7"
                        // className={`${
                        //   confirmPasswordFocus &&
                        //   (!validConfirmPassword || userConfirmPassword === "")
                        //     ? "errInput"
                        //     : "passInput"
                        // }`}
                        type="text"
                        placeholder={`Enter ${row.property}`}
                        // value={row.value}
                        // onChange={(e) => setUserConfirmPassword(e.target.value)}
                        required
                        aria-describedby="userConfirmPassword"
                        // onFocus={() => setConfirmPasswordFocus(true)}
                      />
                      {/* <p
                     id="userConfirmPassword"
                     // className={`errMsg ${
                     //   confirmPasswordFocus &&
                     //   (!validConfirmPassword || userConfirmPassword === "")
                     //     ? "shown"
                     //     : "hidden"
                     // }`}
                   >
                     Must match your password input!
                   </p> */}
                    </Form.Group>
                  ) : (
                    <p className={` mb-0`}>{row.value}</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editCond ? (
        <div className="my-3 d-flex gap-2 justify-content-end">
          <Button
            // className="d-block ms-auto my-3 "
            variant="contained"
            color="success"
            // onClick={handleChangeEditCond}
          >
            Save
          </Button>
          <Button
            // className="d-block ms-auto my-3 "
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
    </div>
  );
};

export default ProfileInfo;
