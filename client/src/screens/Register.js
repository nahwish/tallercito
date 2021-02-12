import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = ({ setUser }) => {
	const [input, setInput] = useState();
	const history = useHistory();
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		try {
			const user = await axios.post(
				'http://localhost:4000/usuarios/register',
				input
			);
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
			history.push('/');
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleChange = (ev) => {
		setInput({
			...input,
			[ev.target.name]: ev.target.value,
		});
	};
	return (
		<div className='container'>
			<h1>Registrate:</h1>
			<form onSubmit={handleSubmit}>
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
				<input
					required
					name='firstName'
					type='text'
					placeholder='First Name'
					onChange={handleChange}
				/>
				<input
					required
					name='lastName'
					type='text'
					placeholder='Last Name'
					onChange={handleChange}
				/>
				<input
					required
					name='phone'
					type='tel'
					placeholder='Phone'
					onChange={handleChange}
				/>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default Register;
