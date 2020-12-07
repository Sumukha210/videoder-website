import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="SpinnerContainer">
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default Loader;
