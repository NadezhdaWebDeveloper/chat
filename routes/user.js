
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

var User = require('../models/user').User;

module.exports = function(app) {

  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users){
      if (err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user){
      if (err) return next(err);
      res.json(user);
    });
  });

  app.get('/cabinet', function(req, res, next) {
    res.end('user\'s cabinet');
  });

};
