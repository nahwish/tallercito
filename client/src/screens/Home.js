import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
	const history = useHistory();
	const [appo, setAppo] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		if (!localUser) {
			history.push('/login');
		}
		setUser(localUser);
		axios.get('http://localhost:4000/turnos').then((result) => {
			setAppo(result.data);
		});
	}, []);

	console.log('appo', appo);
	if (user?.role === 'paciente')
		return (
			<form>
				<input type='date' />
			</form>
		);
	else {
		return (
			<div>
				{!!appo?.length &&
					appo.map((appointment) => (
						<div key={appointment.id}>{appointment.fecha}</div>
					))}
			</div>
		);
	}
};

export default Home;
