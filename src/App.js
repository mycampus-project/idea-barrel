import "./App.css";
import Router from "./components/navigation/Router";
import React, { useContext, useEffect } from "react";

import NavigationBar from "./components/navigation/NavigationBar";
import { SnackbarContainer } from "./contexts/SnackbarContext";
import SnackbarUtil from "./components/Snackbar";
import { CssBaseline } from "@material-ui/core";
import { UserContext } from "./contexts/UserContext"

function App() {

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

  useEffect(()=> {
    userFromLocal()
  },[]) //eslint-disable-line

  return (
    <div>
      <CssBaseline />
      <div style={{ paddingBottom: "16px" }}>
        <NavigationBar></NavigationBar>
      </div>
      <SnackbarContainer>
        <div id="main-content">
          <Router></Router>
          <SnackbarUtil />
        </div>
      </SnackbarContainer>
    </div>
  );
}

export default App;
