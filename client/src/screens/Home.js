import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
	const history = useHistory();
	const [appo, setAppo] = useState([]);
	const [user, setUser] = useState({});
	const [date, setDate] = useState('');
	const [doctors, setDoctors] = useState([]);
	const select = useRef(null);
	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		if (!localUser) {
			history.push('/login');
		}
		setUser(localUser);
		if (localUser.role === 'doctor') {
			axios
				.post('http://localhost:4000/turnos', {
					doctorId: localUser.id,
				})
				.then((result) => {
					setAppo(result.data);
				});
		} else {
			axios
				.get('http://localhost:4000/usuarios/doctors')
				.then((result) => {
					setDoctors(result.data);
				});
		}
	}, []);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		console.log(select.current.value);
		axios.post('http://localhost:4000/turnos/create', {
			fecha: date,
			doctorId: Number(select.current.value),
			pacienteId: user.id,
		});
		alert('Tu turno fue solicitado exitosamente.');
		setDate('');
	};

	if (user?.role === 'paciente')
		return (
			<>
				<div className='container'>
					<h1>Elegir fecha para un turno:</h1>
					<form onSubmit={handleSubmit}>
						<input
							type='date'
							value={date}
							required
							onChange={(ev) => setDate(ev.target.value)}
						/>
						<select ref={select}>
							{doctors.map((doctor) => (
								<option
									value={doctor.id}
									key={doctor.id}
								>{`${doctor.firstName} ${doctor.lastName}`}</option>
							))}
						</select>
						<button type='submit'>Solicitar</button>
					</form>
				</div>
			</>
		);
	else {
		return (
			<div className='container'>
				<h1>Tus turnos asignados:</h1>
				{appo?.length ? (
					<ul className='doctor-apps'>
						{appo.map((appointment) => (
							<li key={appointment.id}>
								Fecha: {appointment.fecha.split('T')[0]}{' '}
								<span>
									Paciente:{' '}
									{`${appointment.paciente.firstName} ${appointment.paciente.lastName}`}
								</span>
							</li>
						))}
					</ul>
				) : (
					<p>No tienes turnos asignados todavía.</p>
				)}
			</div>
		);
	}
};

export default Home;
