import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDropZone from "../ReactDropZone";
import { fetchFile } from "@ffmpeg/ffmpeg";
import Video from "../../common/Video";
import DownloadLink from "../../common/DownloadLink";
import ConvertNowBtn from "../../common/ConvertNowBtn";
import CustomProgressBar from "../../common/CustomProgressBar";
import Form from "react-bootstrap/Form";

const Gif = ({ ffmpeg }) => {
  const [videoFile, setVideoFile] = useState();
  const [progressVisibility, setProgressVisibility] = useState(false);
  const [completedNow, setCompletedNow] = useState(0);
  const [convertedVideo, setConvertedVideo] = useState();

  console.log("gif COMPONENT");

  const convertFun = async () => {
    // Write the file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));

    // Run the FFMpeg command
    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "2.5",
      "-ss",
      "2.0",
      "-f",
      "gif",
      "out.gif"
    );

    // Read the result
    const data = ffmpeg.FS("readFile", "out.gif");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setConvertedVideo(url);
  };

  useEffect(() => {
    ffmpeg.setProgress(({ ratio }) => {
      console.log("completed now is", parseFloat(ratio) * 100);
      setCompletedNow(Math.round(parseFloat(ratio) * 100));
    });
  }, [ffmpeg]);

  const handleCancelBtn = useCallback(() => {
    setVideoFile(null);
    setProgressVisibility(false);
  }, [setVideoFile]);

  const handleSubmit = e => {
    e.preventDefault();

    setTimeout(() => {
      setProgressVisibility(true);
    }, 200);

    convertFun();
  };

  return (
    <div className="gif">
      <div className="gif__container">
        <Row className="align-items-center justify-content-center mx-5">
          <Col lg={12} sm={12} className="fileuploader__area">
            {videoFile ? (
              <Video videoFile={videoFile} handleCancelBtn={handleCancelBtn} />
            ) : (
              <ReactDropZone setVideoFile={setVideoFile} />
            )}
          </Col>

          <Col lg={12} sm={12}>
            <div className="gif__content">
              <form onSubmit={handleSubmit}>
                <p>(convert mp4 videos to gif)</p>

                <ConvertNowBtn videoFile={videoFile} />
              </form>

              <CustomProgressBar
                progressVisibility={progressVisibility}
                completedNow={completedNow}
              />
              <Form.Group className="download__video">
                {completedNow === 100 && videoFile && (
                  <p>
                    Video is successfully converted.{" "}
                    <a
                      href={convertedVideo}
                      className="downloadLink"
                      download={`${convertedVideo && convertedVideo}`}>
                      Click here to download
                    </a>{" "}
                  </p>
                )}
                {console.log("VIDEOFILE", convertedVideo)}
              </Form.Group>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Gif;
