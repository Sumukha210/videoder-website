import React from "react";
import Form from "react-bootstrap/Form";

const DownloadLink = ({ completedNow, videoFile, convertedVideo }) => {
  return (
    <>
      <Form.Group className="download__video">
        {completedNow === 100 && videoFile && (
          <p>
            Video is successfully converted.{" "}
            <a
              href={convertedVideo}
              className="downloadLink"
              download={`${videoFile && videoFile.name}`}>
              Click here to download
            </a>{" "}
          </p>
        )}
      </Form.Group>
    </>
  );
};

export default DownloadLink;
