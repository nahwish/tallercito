const { Sequelize } = require('sequelize');

const db = new Sequelize(`postgres://postgres:1234@localhost/taller`, {
	logging: false,
	native: false,
});

module.exports = db;
