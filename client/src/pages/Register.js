import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Register = ({ setUser }) => {
	const history = useHistory();
	const [input, setInput] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const handleChange = (ev) => {
		setInput({
			...input,
			[ev.target.name]: ev.target.value,
		});
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		const user = await axios.post(
			'http://localhost:4000/users/register',
			input
		);
		localStorage.setItem('user', JSON.stringify(user.data));
		setUser(user.data);
		history.push('/');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				required
				name='firstName'
				type='text'
				placeholder='Nombre'
				onChange={handleChange}
			/>
			<input
				required
				name='lastName'
				type='text'
				placeholder='Apellido'
				onChange={handleChange}
			/>
			<input
				required
				name='email'
				type='email'
				placeholder='Email'
				onChange={handleChange}
			/>
			<input
				required
				name='password'
				type='password'
				placeholder='Password'
				onChange={handleChange}
			/>
			<button type='submit'>Registrar</button>
		</form>
	);
};

export default Register;
