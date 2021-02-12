const { DataTypes: D } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	firstName: {
		type: D.STRING,
	},
	lastName: {
		type: D.STRING,
	},
	email: {
		type: D.STRING,
	},
	password: {
		type: D.STRING,
	},
	role: {
		type: D.ENUM(['doctor', 'patient']),
		defaultValue: 'patient',
	},
});

module.exports = User;
