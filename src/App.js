import "./App.css";
import Router from "./components/navigation/Router";
import React, { useContext, useEffect } from "react";
import NavigationBar from "./components/navigation/NavigationBar";
import { SnackbarContainer } from "./contexts/SnackbarContext";
import SnackbarUtil from "./components/Snackbar";
import { CssBaseline } from "@material-ui/core";
import { UserContext } from "./contexts/UserContext"


import {  makeStyles } from "@material-ui/core"; //eslint-disable-line

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      width: "50%",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",
    }
  },

}))

function App() {
  const classes = useStyles()

  const localStorageUserGet = window.localStorage.getItem("user")


  const { setUser } = useContext(UserContext) // eslint-disable-line

  const userFromLocal = async () => {
    if (localStorageUserGet != null || undefined) {
      console.log("User from local");
      console.log(localStorageUserGet)
      const parse = JSON.parse(localStorageUserGet)
      setUser(parse)
    } else {
      console.log("not setting from local");
    }
  }

  useEffect(()=> {
    userFromLocal()
  },[]) //eslint-disable-line

  return (
    <div className={classes.root}>
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
