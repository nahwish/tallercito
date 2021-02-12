import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
	const history = useHistory();
	const handleLogout = () => {
		localStorage.removeItem('user');
		setUser({});
		history.push('/login');
	};

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		setUser(localUser);
	}, []);

	return (
		<nav>
			{user && Object.keys(user).length ? (
				<ul>
					<li>Inicio</li>
					<li onClick={handleLogout}>Logout</li>
				</ul>
			) : (
				<ul>
					<li onClick={() => history.push('/login')}>Login</li>
					<li onClick={() => history.push('/register')}>SignUp</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
