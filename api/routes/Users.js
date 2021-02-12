const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const user = await User.create(req.body, { raw: true });
		return res.json(user);
	} catch (err) {
		return res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		where: {
			email,
			password,
		},
	});
	if (user) {
		return res.json(user);
	}
	return res.status(404).json('User Not Found');
});

router.get('/doctors', async (req, res) => {
	const doctors = await User.findAll({
		where: { role: 'doctor' },
	});
	res.json(doctors);
});

module.exports = router;
