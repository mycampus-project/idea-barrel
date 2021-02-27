import React from "react";

import { navigate } from "hookrouter";

const NavigationItem = ({ url, title }) => {
  return (
    <span className="nav-item" onClick={() => navigate(url, true)}>
      {title}
    </span>
  );
};

export default NavigationItem;
