import {config, setConfig} from './config';
// Const bodyParser = require('body-parser');
const express = require('express');
const router = new express.Router();
// Const jsonParser = bodyParser.json();

router.get('/config', (_request, response, _next) => {
	response.json({
		data: config,
		ok: 1
	});
});

router.put('/config', (request, response, _next) => {
	// Console.log(request.body);
	try {
		setConfig(request.body);
		response.json({
			data: request.body,
			ok: 1
		});
	} catch (error) {
		response.json({
			error,
			ok: 0
		});
	}
});

module.exports = router;
