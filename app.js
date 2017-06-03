var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
// var routes = require('./routes');
// var user = require('./routes/user');
process.env.NODE_ENV = 'development';

// console.log(config);

var app = express();

app.set('port', config.get('port'));

// Middleware
app.use(function(req, res, next) {
  if (req.url == '/') {
    res.end('index page');
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (req.url == '/cabinet') {
    res.end('user\'s page');
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (req.url == '/forbidden') {
    next(new Error('Opps, denied!'));
  } else {
    next();
  }
});

app.use(function(req, res) {
  res.send(404, 'Page not found. Sorry!');
});

// Функция-обработчик ошибок - функция с четырьмя параметрами
app.use(function(err, req, res, next) {
  // NODE_ENV == 'production' - по умолчанию

  // development only
  if ('development' == app.get('env')) {
    var errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    console.log(app.get('env'));
    res.send(500);
  }
});

// Creating server
http.createServer(app).listen(config.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});

// // all environments
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'your secret here' }));
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
//
//
// app.get('/', routes.index);
// app.get('/users', user.list);
