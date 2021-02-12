const { DataTypes: D } = require('sequelize');
const User = require('./User');
const db = require('../db');

const Appointment = db.define(
	'appointment',
	{
		fecha: {
			type: D.DATE,
		},
	},
	{
		timestamps: false,
	}
);

Appointment.belongsTo(User, { as: 'patient' });
Appointment.belongsTo(User, { as: 'doctor' });

module.exports = Appointment;
