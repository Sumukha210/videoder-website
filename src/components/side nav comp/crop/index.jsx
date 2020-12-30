import React, { useState, useCallback, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactDropZone from "../ReactDropZone";
import CustomInput from "../../common/CustomInput";
import Video from "../../common/Video";
import DownloadLink from "../../common/DownloadLink";
import ConvertNowBtn from "../../common/ConvertNowBtn";
import CustomProgressBar from "../../common/CustomProgressBar";
import { fetchFile } from "@ffmpeg/ffmpeg";
import videoDimensions from "./VideoDimensions";
import MainTitle from "../../common/MainTitle";

const Crop = ({ ffmpeg }) => {
  const [videoFile, setVideoFile] = useState();
  const [progressVisibility, setProgressVisibility] = useState(false);
  const [completedNow, setCompletedNow] = useState(0);
  const [convertedVideo, setConvertedVideo] = useState();
  const [selectMenu, setSelectMenu] = useState("426*240");

  const convertFun = async (width, height, x, y) => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));

    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-filter:v",
      `crop=w=${width}:h=${height}:x=${x}:y=${y}`,
      "out.mp4"
    );

    const data = ffmpeg.FS("readFile", "out.mp4");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setConvertedVideo(url);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const splitSelectMenu = e.target.selectMenu.value.split("*");

    let x = e.target.x.value;
    let y = e.target.y.value;
    let w = splitSelectMenu[0];
    let h = splitSelectMenu[1];

    setTimeout(() => {
      setProgressVisibility(true);
    }, 200);

    console.log(x, y, w, h);
    convertFun(w, h, x, y);
  };

  const handleCancelBtn = useCallback(() => {
    setVideoFile(null);
    setProgressVisibility(false);
    window.location.reload();
  }, [setVideoFile]);

  const handleSelectMenu = useCallback(
    e => {
      console.log(e.target.value);
      setSelectMenu(e.target.value);
    },
    [setSelectMenu]
  );

  useEffect(() => {
    ffmpeg.setProgress(({ ratio }) => {
      console.log("completed now is", parseFloat(ratio) * 100);
      setCompletedNow(Math.round(parseFloat(ratio) * 100));
    });
  }, [ffmpeg]);

  return (
    <div className="crop">
      <div className="crop__container">
        <MainTitle title="Crop" />
        <Row className="align-items-center justify-content-center">
          <Col md={12} sm={12} lg={6} className="fileuploader__area">
            {videoFile ? (
              <Video videoFile={videoFile} handleCancelBtn={handleCancelBtn} />
            ) : (
              <ReactDropZone setVideoFile={setVideoFile} />
            )}
          </Col>

          <Col md={12} sm={12} lg={6}>
            <div className="crop__content">
              <div className="options">
                <h5 className="title text-uppercase">Options:-</h5>

                <div className="options__container">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-between">
                      <CustomInput name="x" initialValue={100} />
                      <CustomInput name="y" initialValue={200} />
                    </div>

                    <div className="customSelectMenu my-3">
                      <label htmlFor="AspectRatio">Video Dimensions:-</label>
                      <select
                        id="AspectRatio"
                        value={selectMenu}
                        name="selectMenu"
                        onChange={handleSelectMenu}>
                        {videoDimensions.map(({ name, ratio }, i) => (
                          <option key={i} value={ratio}>
                            {`${ratio}(${name})`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <ConvertNowBtn videoFile={videoFile} />
                  </form>
                </div>
              </div>

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

export default Crop;
