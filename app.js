var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var hpp          = require('hpp');
var helmet       = require('helmet');

var config       = require('./config');
var indexRoutes  = require('./routes/index');
var apiRoutes    = require('./routes/api');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.disable("x-powered-by");
app.disable('etag');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(hpp());
app.use(cookieParser());

app.use('/', indexRoutes);
app.use('/api', apiRoutes.router);
app.use('/api', apiRoutes.authRouter);
app.use(express.static(path.join(__dirname, 'public')));


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers under development
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;
