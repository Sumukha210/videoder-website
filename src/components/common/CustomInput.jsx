import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const CustomInput = ({ initialValue = 0, name, ...props }) => {
	const [value, setValue] = useState(initialValue);

	const handleInput = e => {
		setValue(e.target.value);
	};

	return (
		<Form.Group>
			<Form.Label>{name} :-</Form.Label>
			<Form.Control min={0} onChange={handleInput} value={value} type="number" name={name} />
		</Form.Group>
	);
};

export default CustomInput;
