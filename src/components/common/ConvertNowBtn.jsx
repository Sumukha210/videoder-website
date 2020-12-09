import React from "react";
import Form from "react-bootstrap/Form";

const ConvertNowBtn = ({ videoFile }) => {
  return (
    <>
      <Form.Group>
        <button
          disabled={videoFile ? false : true}
          style={{ opacity: videoFile ? 1 : 0.5 }}
          type="submit"
          className="customBtn customBtn__small">
          Start conversion
        </button>
      </Form.Group>
    </>
  );
};

export default ConvertNowBtn;
