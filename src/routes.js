const express = require('express');
const router = new express.Router();

router.get('/*', (_request, response, _next) => {
	response.header('Access-Control-Allow-Origin', '*').render('index');
});

module.exports = router;
