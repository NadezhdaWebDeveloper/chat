
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

module.exports = function(app) {

  require('./user')(app);

  app.get('/', function(req, res, next) {
    res.render('index');
  });

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
