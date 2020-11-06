const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api = require('./api');
const indexRouter = require('./router');
const app = express();

// View engine setup
const ejs = require('ejs');
app.set('views', path.join(__dirname, '/ui/dist'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/ui/dist')));

app.use('/api', api);
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((_request, _response, next) => {
	next(createError(404));
});

// Error handler
app.use((err, request, response, _next) => {
	console.log('error', err);
	// Set locals, only providing error in development
	response.locals.message = err.message;
	response.locals.error = request.app.get('env') === 'development' ? err : {};

	// Render the error page
	response.status(err.status || 500);
	response.render('error');
});

module.exports = app;
