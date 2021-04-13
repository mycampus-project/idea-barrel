import React, { useState, useContext, useEffect } from "react";

import APIDemo from "../components/dev/APIDemo";
import UserDialog from "../components/UserDialog"
import { UserContext } from "../contexts/UserContext"

const HomePage = () => {

  const [userDlgOpen, setUserDlgOpen] = useState(false)

  const localStorageUserGet = window.localStorage.getItem("user")


  const { user, setUser } = useContext(UserContext) // eslint-disable-line

  const userFromLocal = () => {
    if (localStorageUserGet != null || undefined) {
      console.log("User from local");
      setUser(JSON.parse(localStorageUserGet))
    } else {
      console.log("not setting from local");
    }
  }

  const handleUserDlgClose = () => {
    setUserDlgOpen(false)
  }

  const handleUserDlgOpen = () => {
    setUserDlgOpen(true)
  }

  useEffect(()=>{
    userFromLocal()
  },[]) //eslint-disable-line

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div>
        <h3>
          A temporary "home page" until we figure out the structure better
        </h3>
        <p>
          Do -- <span style={{ color: "red" }}>npm run db</span> -- in another
          terminal if you want to start the json server (given that you have
          done npm install first).
        </p>
        <button onClick={handleUserDlgOpen}>Open UserDialog</button>
        <UserDialog open={userDlgOpen} handleUserDlgClose={handleUserDlgClose} />
      </div>
      <div>
        <APIDemo />
      </div>
    </div>
  );
};

export default HomePage;
