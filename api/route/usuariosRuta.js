const express = require('express');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.post('/register', async (req, res) => {
	const user = await Usuario.create(req.body, { raw: true });
	return res.json(user);
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await Usuario.findOne({
		where: { email, password },
	});
	if (user) {
		return res.json(user);
	} else {
		return res.status(404).json('Credenciales invalidas');
	}
});

router.get('/doctors', async (req, res) => {
	const doctor = await Usuario.findAll({
		where: {
			role: 'doctor',
		},
	});
	res.json(doctor);
});

module.exports = router;
