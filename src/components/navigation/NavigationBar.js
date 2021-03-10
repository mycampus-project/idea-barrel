import "../../styles/nav-styles.css";

import React from "react"

import NavigationItem from "./NavigationItem";
import { AppBar, Toolbar } from "@material-ui/core";

const NavigationBar = () => {
  return (
    <div className="nav-list">
      <AppBar>
        <Toolbar>
          <NavigationItem url="/" title="Home" />
          <NavigationItem url="/idea-barrel" title="Idea Barrel" />
          <NavigationItem url="/events" title="Events" />
          <NavigationItem url="/bulletin" title="Bulletin Board" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
