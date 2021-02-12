import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Login = ({ setUser }) => {
	const history = useHistory();
	const [input, setInput] = useState({
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
			'http://localhost:4000/users/login',
			input
		);
		localStorage.setItem('user', JSON.stringify(user.data));
		setUser(user);
		history.push('/');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input required name='email' type='email' onChange={handleChange} />
			<input
				required
				name='password'
				type='password'
				onChange={handleChange}
			/>
			<button type='submit'>Enviar</button>
		</form>
	);
};

export default Login;
