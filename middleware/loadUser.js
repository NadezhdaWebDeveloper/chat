var User = require('../models/user').User;

module.exports = function(req, res, next) {
  // если не авторизован, то user равно null.
  // То есть, если человек не авторизвался, объект user все равно будет создан со значением null
  req.user = res.locals.user = null;

  if (!req.session.user) return next();

  User.findById(req.session.user, function(err, user) {
    if (err) return next(err);

    // res.locals - все, что будет записано в этот объект, будет доступно в разных шаблонах
    req.user = res.locals.user = user;
    next();
  });

};
