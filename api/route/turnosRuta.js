const express = require('express');
const Turno = require('../model/Turno');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.post('/', async (req, res) => {
	const { doctorId } = req.body;
	const turnos = await Turno.findAll({
		where: {
			doctorId,
		},
		include: [
			{
				model: Usuario,
				as: 'paciente',
			},
		],
	});
	res.json(turnos);
});

router.post('/create', async (req, res) => {
	console.log('req.body', req.body);
	await Turno.create(req.body);
	res.json('Turno creado');
});

router.delete('/cancel', async (req, res) => {
	await Turno.destroy({ where: { id: req.body.id } });
	res.json('Turno Cancelado');
});

module.exports = router;
