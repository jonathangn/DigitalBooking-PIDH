import React from "react";
import Seeker from "./BodySeeker";
import Grider from "./BodyGrider";
import Listing from "./BodyListing";

import "./Body.css";

function Body() {
  return (
    <div className="body">
      <div className="body-container">
        <Seeker />
        <Grider />
        <Listing />
      </div>
    </div>
  );
}

export default Body;
