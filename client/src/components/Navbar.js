import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
	const history = useHistory();
	return (
		<nav>
			{user && Object.keys(user).length > 0 ? (
				<ul>
					<li>
						<a href='/'>Inicio</a>
					</li>
					<li>
						<a
							onClick={() => {
								localStorage.removeItem('user');
								setUser({});
								history.push('/login');
							}}
						>
							Logout
						</a>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<a href='/login'>Iniciar Sesion</a>
					</li>
					<li>
						<a href='/register'>Registrarse</a>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
