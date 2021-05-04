import React, { useState } from "react";

import UserDialog from "../components/UserDialog";
import { Button } from "@material-ui/core";

const HomePage = () => {
  const [userDlgOpen, setUserDlgOpen] = useState(false);

  const handleUserDlgClose = () => {
    setUserDlgOpen(false);
  };

  const handleUserDlgOpen = () => {
    setUserDlgOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>
        Please select a premade user profile from the button below. Features can
        then be accessed from the navigation bar above.
      </h2>
      <br></br>
      <Button variant="outlined" onClick={handleUserDlgOpen}>
        <b>Select user</b>
      </Button>
      <UserDialog open={userDlgOpen} handleUserDlgClose={handleUserDlgClose} />
    </div>
  );
};

export default HomePage;
