const { DataTypes: D } = require('sequelize');
const db = require('../db');
const Usuario = require('./Usuario');

const Turno = db.define('turnos', {
	fecha: {
		type: D.DATE,
	},
});

Turno.belongsTo(Usuario, { as: 'paciente' });
Turno.belongsTo(Usuario, { as: 'doctor' });

module.exports = Turno;
