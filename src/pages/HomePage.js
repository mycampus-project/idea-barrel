import React from "react";

import APIDemo from "../components/dev/APIDemo";

const HomePage = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <div>
        <h3>
          A temporary "home page" until we figure out the structure better
        </h3>
        <p>
          Do -- <span style={{ color: "red" }}>npm run db</span> -- in another
          terminal if you want to start the json server (given that you have done npm install first).
        </p>
      </div>
      <div>
        <APIDemo />
      </div>
    </div>
  );
};

export default HomePage;
