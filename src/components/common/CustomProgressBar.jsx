import React from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

const CustomProgressBar = ({ progressVisibility, completedNow }) => {
  return (
    <>
      <Form.Group>
        {progressVisibility && (
          <ProgressBar
            animated
            now={completedNow}
            label={`${completedNow} %`}
          />
        )}
      </Form.Group>
    </>
  );
};

export default CustomProgressBar;
