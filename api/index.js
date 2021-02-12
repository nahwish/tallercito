const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const db = require('./db');

const turnosRuta = require('./route/turnosRuta');
const usuariosRuta = require('./route/usuariosRuta');

const Turno = require('./model/Turno');
const Usuario = require('./model/Usuario');

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
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

app.use('/turnos', turnosRuta);
app.use('/usuarios', usuariosRuta);

db.sync({ force: true })
	.then(() => {
		app.listen(4000, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Escuchando en localhost:4000');
			}
		});
		return Usuario.create({
			firstName: 'Emiliano',
			lastName: 'Alfonso',
			telefono: 666,
			email: 'emi@mail.com',
			password: '12345',
			role: 'doctor',
		});
	})
	.then(() => {
		console.log('USUARIO CREADO');
		const date = new Date();
		return Turno.create({
			fecha: date,
		});
	})
	.then(() => {
		console.log('TURNO CREADO');
	});
