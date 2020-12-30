import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ReactDropZone from "../ReactDropZone";
import { fetchFile } from "@ffmpeg/ffmpeg";
import Video from "../../common/Video";
import DownloadLink from "../../common/DownloadLink";
import ConvertNowBtn from "../../common/ConvertNowBtn";
import CustomProgressBar from "../../common/CustomProgressBar";
import RangeSlider from "../../common/RangeSlider";
import MainTitle from "../../common/MainTitle";

const Compress = ({ ffmpeg }) => {
  const [videoFile, setVideoFile] = useState();
  const [rangeInputVal, setRangeInputVal] = useState(1);
  const [progressVisibility, setProgressVisibility] = useState(false);
  const [completedNow, setCompletedNow] = useState(0);
  const [convertedVideo, setConvertedVideo] = useState();

  console.log("COMPRESS COMPONENT");

  const convertFun = async num => {
    // Write the file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));

    // Run the FFMpeg command
    await ffmpeg.run("-i", "test.mp4", "-crf", `${num}`, "out.mp4");

    // Read the result
    const data = ffmpeg.FS("readFile", "out.mp4");

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setConvertedVideo(url);
  };

  useEffect(() => {
    ffmpeg.setProgress(({ ratio }) => {
      console.log("completed now is", parseFloat(ratio) * 100);
      setCompletedNow(Math.round(parseFloat(ratio) * 100));
    });
  }, [ffmpeg]);

  const handleRangeInput = useCallback(
    e => {
      setRangeInputVal(e.target.value);
    },
    [setRangeInputVal]
  );

  const handleCancelBtn = useCallback(() => {
    setVideoFile(null);
    setProgressVisibility(false);
    window.location.reload();
  }, [setVideoFile, setProgressVisibility]);

  const handleSubmit = e => {
    e.preventDefault();

    setTimeout(() => {
      setProgressVisibility(true);
    }, 200);

    convertFun(e.target.range.value);

    console.log(e.target.range.value);
  };

  return (
    <div className="compress">
      <div className="compress__container">
        <MainTitle title="Compress" />

        <Row className="align-items-center justify-content-center">
          <Col md={12} sm={12} lg={6} className="fileuploader__area">
            {videoFile ? (
              <Video videoFile={videoFile} handleCancelBtn={handleCancelBtn} />
            ) : (
              <ReactDropZone setVideoFile={setVideoFile} />
            )}
          </Col>

          <Col md={12} sm={12} lg={6}>
            <div className="compress__content">
              <form onSubmit={handleSubmit}>
                <Form.Group className="choose__quality">
                  <Form.Label>choose quality:-</Form.Label>

                  <RangeSlider
                    min="1"
                    max="50"
                    rangeInputVal={rangeInputVal}
                    handleRangeInput={handleRangeInput}
                  />

                  <p>(higher the value,smaller the size)</p>
                </Form.Group>

                <ConvertNowBtn videoFile={videoFile} />
              </form>

              <CustomProgressBar
                progressVisibility={progressVisibility}
                completedNow={completedNow}
              />

              <DownloadLink
                completedNow={completedNow}
                convertedVideo={convertedVideo}
                videoFile={videoFile}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Compress;
