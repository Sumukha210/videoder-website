import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactDropZone from '../ReactDropZone';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomInput from '../../common/CustomInput';

const Rotate = () => {
	const [videoFile, setVideoFile] = useState();
	const [progressVisibility, setProgressVisibility] = useState(false);
	const [completedNow, setCompletedNow] = useState(0);

	const handleCancelBtn = () => {
		setVideoFile(null);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const rotatedValue = e.target.rotate.value;

		setTimeout(() => {
			setProgressVisibility(true);
		}, 200);

		console.log(rotatedValue);
	};

	console.log('rotate video', videoFile);

	return (
		<div className="rotate">
			<div className="rotate__container">
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
						<div className="rotate__content">
							<div className="options">
								<div className="options__container">
									<form onSubmit={handleSubmit}>
										<CustomInput name="rotate" />

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

export default Rotate;
