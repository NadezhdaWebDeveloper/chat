
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {

  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users){
      if (err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', function(req, res, next) {
    try {
      var id = new ObjectID(req.params.id);
    } catch (e) {
      return next(new HttpError(404, 'User not found'));
    }

    User.findById(id, function(err, user){
      if (err) return next(err);

      res.json(user);
    });
  });

  app.get('/cabinet', function(req, res, next) {
    res.end('user\'s cabinet');
  });

};
