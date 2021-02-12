const { DataTypes: D } = require('sequelize');
const db = require('../db');
const Usuario = db.define('usuarios', {
	firstName: {
		type: D.STRING,
	},
	lastName: {
		type: D.STRING,
	},
	phone: {
		type: D.STRING,
	},
	email: {
		type: D.STRING,
		allowNull: false,
	},
	password: {
		type: D.STRING,
		allowNull: false,
	},
	role: {
		type: D.ENUM('paciente', 'doctor'),
		defaultValue: 'paciente',
	},
});

module.exports = Usuario;
