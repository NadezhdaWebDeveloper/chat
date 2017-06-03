var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
// var routes = require('./routes');
// var user = require('./routes/user');

var app = express();

// Middleware
app.engine('ejs', require('ejs-locals')); // layout partial block
/*
* layout - некоторое оформление, которое пишем в отдельный файл и в нем указываем, куда вставлять body.
* Block - используются там, где надо задавать какое-то содержимое в отдельных шаблонах
* Partial - подшаблон
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// all environments
app.use(express.favicon()); // /favicon.ico

if (app.get('env') == 'development') {
  app.use(express.logger('dev'));
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser()); // req.body....

app.use(express.cookieParser()); // req.headers

app.use(express.static(path.join(__dirname, 'public')));

app.use(app.router);

app.get('/', function(req, res, next) {
  // res.end('index page');
  res.render('index');
});

app.get('/cabinet', function(req, res, next) {
  res.end('user\'s page');
});

app.get('/cabinet', function(req, res, next) {
  res.end('user\'s page');
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
    res.send(500);
  }
});

// Creating server
http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

// app.get('/', routes.index);
// app.get('/users', user.list);
