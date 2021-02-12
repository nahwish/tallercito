import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setUser }) => {
	const history = useHistory();
	const [input, setInput] = useState({
		email: '',
		password: '',
	});
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		try {
			const user = await axios.post(
				'http://localhost:4000/usuarios/login',
				input
			);
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
			history.push('/');
		} catch (err) {
			console.error('err', err);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				onChange={(ev) =>
					setInput({ ...input, email: ev.target.value })
				}
			/>
			<input
				type='password'
				onChange={(ev) =>
					setInput({ ...input, password: ev.target.value })
				}
			/>
			<button type='submit'>Login</button>
		</form>
	);
};

export default Login;
