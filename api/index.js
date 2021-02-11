const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.listen(4000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Escuchando en localhost:4000');
	}
});
