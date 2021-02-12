import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = ({ user, setUser }) => {
	const [doctors, setDoctors] = useState([]);
	const [date, setDate] = useState('');
	const [appo, setAppo] = useState([]);
	const history = useHistory();
	const selectDoctor = useRef(null);

	useEffect(() => {
		const userLocal = JSON.parse(localStorage.getItem('user'));
		setUser(userLocal);
		if (!userLocal) {
			history.push('/login');
		}
		if (userLocal.role === 'doctor') {
			axios
				.post('http://localhost:4000/appointments', {
					id: userLocal.id,
				})
				.then((result) => setAppo(result.data));
		} else {
			axios.get('http://localhost:4000/users/doctors').then((result) => {
				setDoctors(result.data);
			});
		}
	}, []);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		axios.post('http://localhost:4000/appointments/create', {
			fecha: date,
			doctorId: Number(selectDoctor.current.value),
			patientId: user.id,
		});
		alert('Turno creado con exito');
		setDate('');
	};
	console.log('appo', appo);
	if (user.role === 'doctor') {
		return (
			<div className='container'>
				<h1>Tus turnos asignados:</h1>
				<ul className='doctor-apps'>
					{appo.length > 0 &&
						appo.map((appointment) => (
							<li key={appointment.id}>
								Fecha: {appointment.fecha}
								<span>
									Paciente: {appointment.patient.firstName}
									{appointment.patient.lastName}
								</span>
							</li>
						))}
				</ul>
			</div>
		);
	} else {
		return (
			<form onSubmit={handleSubmit}>
				<input
					type='date'
					onChange={(ev) => setDate(ev.target.value)}
					value={date}
				/>
				<select ref={selectDoctor}>
					{doctors.map((doctor) => (
						<option value={doctor.id} key={doctor.id}>
							{doctor.firstName} {doctor.lastName}
						</option>
					))}
				</select>
				<button type='submit'>Agendar</button>
			</form>
		);
	}
};

export default Home;
