const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./db');

/* --- Router --- */
const usersRouter = require('./routes/Users');
const appointmentsRouter = require('./routes/Appointments');

/* --- DB --- */
const User = require('./models/User');
const Appointment = require('./models/Appointment');

/* --- Utils --- */
const arrayUsers = require('./utils/user');
const arrayAppointments = require('./utils/appointments');

app.use(express.json());
app.use(morgan('dev'));

/* --- Cors --- */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
});
/* --- /Cors --- */

app.use('/users', usersRouter);
app.use('/appointments', appointmentsRouter);

db.sync({ force: true }).then(() => {
	app.listen(4000, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Escuchando en localhost:4000');
			User.bulkCreate(arrayUsers)
				.then(() => {
					console.log('Se crearon usuarios');
					return Appointment.bulkCreate(arrayAppointments);
				})
				.then(() => {
					console.log('Se crearon los turnos');
				});
		}
	});
});
