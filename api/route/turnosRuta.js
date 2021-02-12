const express = require('express');
const Turno = require('../model/Turno');
const router = express.Router();

router.get('/', async (req, res) => {
	const turnos = await Turno.findAll();
	res.json(turnos);
});

router.post('/create', async (req, res) => {
	await Turno.create(req.body);
	res.json('Turno creado');
});

router.delete('/cancel', async (req, res) => {
	await Turno.destroy({ where: { id: req.body.id } });
	res.json('Turno Cancelado');
});

module.exports = router;
