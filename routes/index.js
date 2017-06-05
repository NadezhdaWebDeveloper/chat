
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {

  app.get('/', function(req, res, next) { res.render('index'); });

  require('./user')(app);

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);

  app.post('/logout', require('./logout').post);

  app.get('/chat', checkAuth, require('./chat').get);

  app.get('/cabinet', function(req, res, next) { res.end('user\'s cabinet'); });

  app.get('/forbidden', function(req, res, next) {
    next(new Error('Opps, denied!'));
  });
    // req.url == '/forbidden'
    // app.use(function(req, res, next) {
    //   if (req.url == '/forbidden') {
    //     next(new Error('Opps, denied!'));
    //   } else {
    //     next();
    //   }
    // });

  app.use(function(req, res) {
    res.send(404, 'Page not found. Sorry!');
  });

};
