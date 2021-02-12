const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const router = express.Router();

//TRAER LOS TURNOS DE UN DOCTOR EN ESPECIFICO
router.post('/', async (req, res) => {
	console.log('req.body.id', req.body.id);
	const appointments = await Appointment.findAll({
		include: [{ model: User, as: 'patient' }],
		where: {
			doctorId: req.body.id,
		},
	});
	return res.json(appointments);
});

router.post('/create', async (req, res) => {
	await Appointment.create(req.body);
	return res.json('appointment created succesfully');
});

module.exports = router;
