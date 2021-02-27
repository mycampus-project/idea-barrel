import React from "react";

import NavigationItem from "./NavigationItem";

const NavigationBar = () => {
  return (
    <div className="nav-list">
      <NavigationItem url="/" title="Home" />
      <NavigationItem url="/idea-barrel" title="Idea Barrel" />
      <NavigationItem url="/events" title="Events" />
      <NavigationItem url="/bulletin" title="Bulletin Board" />
    </div>
  );
};

export default NavigationBar;
