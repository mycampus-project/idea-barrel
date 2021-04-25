import "../../styles/nav-styles.css";

import React from "react";

import NavigationItem from "./NavigationItem";

const NavigationBar = () => {
  return (
    <div className="nav-list">
      <NavigationItem url="/events" title="Events" />
      <NavigationItem url="/calendar" title="Calendar" />
    </div>
  );
};

export default NavigationBar;
