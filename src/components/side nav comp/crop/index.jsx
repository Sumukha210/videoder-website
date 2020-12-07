import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactDropZone from '../ReactDropZone';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomInput from '../../common/CustomInput';

const Crop = () => {
	const [videoFile, setVideoFile] = useState();
	const [progressVisibility, setProgressVisibility] = useState(false);
	const [completedNow, setCompletedNow] = useState(0);

	const handleCancelBtn = () => {
		setVideoFile(null);
	};

	const handleSubmit = e => {
		e.preventDefault();
		let x = e.target.x.value;
		let y = e.target.y.value;
		let w = e.target.w.value;
		let h = e.target.h.value;

		setTimeout(() => {
			setProgressVisibility(true);
		}, 200);

		console.log(x, y, w, h);
	};

	console.log('crop video', videoFile);

	return (
		<div className="crop">
			<div className="crop__container">
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
											<CustomInput name="x" />
											<CustomInput name="y" />
										</div>

										<div className="d-flex justify-content-between">
											<CustomInput name="w" />
											<CustomInput name="h" />
										</div>

										<Form.Group>
											<button type="submit" className="customBtn customBtn__small">
												Start conversion
											</button>
										</Form.Group>
									</form>
								</div>
							</div>

							<Form.Group>
								{progressVisibility && (
									<ProgressBar animated now={completedNow} label={`${completedNow} %`} />
								)}
							</Form.Group>

							<Form.Group className="download__video">
								{completedNow === 100 && (
									<p>
										Video is successfully converted.{' '}
										<a href="#" className="downloadLink">
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
	);
};

export default Crop;
