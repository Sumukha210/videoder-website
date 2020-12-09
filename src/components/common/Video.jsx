import React from "react";

const Video = ({ videoFile, handleCancelBtn }) => {
  console.log("VIDEO COMPONENT");

  return (
    <>
      <figure>
        <video controls src={videoFile && URL.createObjectURL(videoFile)} />
        <button className="cancelVideo" onClick={() => handleCancelBtn()}>
          X
        </button>
      </figure>
    </>
  );
};

export default React.memo(Video);
