import React from "react";
import Form from "react-bootstrap/Form";

const RangeSlider = ({ rangeInputVal, handleRangeInput, ...props }) => {
  return (
    <>
      <br />
      <Form.Control
        type="range"
        {...props}
        name="range"
        value={rangeInputVal}
        onChange={handleRangeInput}
      />
      <span>{rangeInputVal && rangeInputVal}</span>
      <br />
    </>
  );
};

export default React.memo(RangeSlider);
