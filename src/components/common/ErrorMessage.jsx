import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="errorMessage">
      <h1 className="text-center">{message}</h1>
    </div>
  );
};

export default ErrorMessage;
