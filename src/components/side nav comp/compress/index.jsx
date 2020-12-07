import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactDropZone from '../ReactDropZone';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Loader from '../../common/Loader';

const Compress = () => {
	const [videoFile, setVideoFile] = useState();
	const [rangeInputVal, setRangeInputVal] = useState(1);
	const [progressVisibility, setProgressVisibility] = useState(false);
	const [completedNow, setCompletedNow] = useState(0);
	const [ready, setReady] = useState(false);
	const [convertedVideo, setConvertedVideo] = useState();

	const ffmpeg = createFFmpeg({
		log: true
		// progress({ ratio }) {
		// 	console.log(ratio);
		// 	setCompletedNow(parseInt(ratio) / 100);
		// }
	});

	const load = async () => {
		await ffmpeg.load();
		setReady(true);
	};

	useEffect(() => {
		load();
	}, []);

	const handleRangeInput = e => {
		e.preventDefault();
		setRangeInputVal(e.target.value);
	};

	const handleCancelBtn = () => {
		setVideoFile(null);
	};

	const setVideoFileFun = value => setVideoFile(value);

	const compressVideoFun = async value => {
		ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(videoFile));

		await ffmpeg.run('-i', 'test.mp4', '-crf', `${value}`, 'out.mp4');

		const data = ffmpeg.FS('readFile', 'out.mp4');

		const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

		setConvertedVideo(url);
	};

	const handleSubmit = e => {
		e.preventDefault();

		setTimeout(() => {
			setProgressVisibility(true);
		}, 200);

		compressVideoFun(e.target.range.value);

		console.log(e.target.range.value);
	};

	console.log('compress video:-', videoFile);

	return (
		<>
			<div className="compress">
				<div className="compress__container">
					<Row className="align-items-center justify-content-center">
						<Col md={12} sm={12} lg={6} className="fileuploader__area">
							{videoFile ? (
								<figure>
									<video controls src={URL.createObjectURL(videoFile)} />
									<button className="cancelVideo" onClick={handleCancelBtn}>
										X
									</button>
								</figure>
							) : (
								<ReactDropZone setVideoFileFun={setVideoFileFun} />
							)}
						</Col>

						<Col md={12} sm={12} lg={6}>
							<div className="compress__content">
								<form onSubmit={handleSubmit}>
									<Form.Group className="choose__quality">
										<Form.Label>choose quality:-</Form.Label>
										<br />
										<Form.Control
											type="range"
											min="1"
											max="50"
											name="range"
											value={rangeInputVal}
											onChange={handleRangeInput}
										/>
										<span>{rangeInputVal && rangeInputVal}</span>
										<br />
										<p>(higher the value,smaller the size)</p>
									</Form.Group>

									<Form.Group>
										<button type="submit" className="customBtn customBtn__small">
											Start conversion
										</button>
									</Form.Group>
								</form>

								<Form.Group>
									{progressVisibility && (
										<ProgressBar animated now={completedNow} label={`${completedNow} %`} />
									)}
								</Form.Group>

								<Form.Group className="download__video">
									{completedNow >= 98 && (
										<p>
											Video is successfully converted.{' '}
											<a
												href={convertedVideo}
												className="downloadLink"
												download={videoFile && videoFile.name}>
												Click here to download
											</a>{' '}
										</p>
									)}
								</Form.Group>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default Compress;
