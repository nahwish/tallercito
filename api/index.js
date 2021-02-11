const express = require('express');
const app = express();
const morgan = require('morgan');
const { Sequelize } = require('sequelize');

app.use(morgan('dev'));

const sequelize = new Sequelize(`postgres://postgres:12345@localhost/taller`, {
	logging: false,
	native: false,
});

sequelize.sync({ force: true }).then(() => {
	app.listen(4000, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Escuchando en localhost:4000');
		}
	});
});
