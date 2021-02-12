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
			localStorage.setItem('user', JSON.stringify(user.data));
			setUser(user);
			history.push('/');
		} catch (err) {
			console.error('err', err);
		}
	};
	return (
		<div className='container'>
			<h1>Iniciar sesión:</h1>
			<form onSubmit={handleSubmit}>
				<input
					required
					type='email'
					placeholder='nombre@mail.com'
					onChange={(ev) =>
						setInput({ ...input, email: ev.target.value })
					}
				/>
				<input
					required
					type='password'
					placeholder='password'
					onChange={(ev) =>
						setInput({ ...input, password: ev.target.value })
					}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
