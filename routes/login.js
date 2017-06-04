var User = require('../models/user').User;
var async = require('async');
var HttpError = require('../error').HttpError;

module.exports =  {

  get: function(req, res) {
          res.render('login');
        },

  post: function(req, res, next) {
          var username = req.body.username;
          var password = req.body.password;

          console.log(username);
          console.log(password);

          // Алгоритм
          /*
          * 1. Получить посетителя с таким username из базы данных
          * 2. Такой посетитель найден?
          *   ДА - сверить пароль вызовом user.checkPassword
          *   НЕТ - создать нового пользователя
          * 3. Авторизация успешна?
          *   ДА - сохранить _id пользователя в сессии: session.user = user._id и ответить 200
          *   НЕТ - вывести ошибку 403 или другую
          */

          /* Ориентировочная реализация алгоритма
            // User.findOne({ username: username }, function(err, user){
            //   if (err) return next(err);
            //
            //   if (user) {
            //     if (user.checkPassword(password)) {
            //       // 200
            //     } else {
            //       // 403
            //     }
            //   } else {
            //     var user = new User({
            //       username: username,
            //       password: password
            //     });
            //
            //     user.save(function(err) {
            //       if (err) return next(err);
            //       // 200
            //     });
            //   }
            // });
          */

          // Реализация алгоритма за счет async.waterfall
          async.waterfall([
            function(callback) {
              User.findOne({ username: username }, callback);
            },
            function(user, callback) {
              if (user) {
                if (user.checkPassword(password)) {
                  callback(null, user);
                } else {
                  next(new HttpError('403', 'Password is invalid'));
                }
              } else {
                var user = new User({
                  username: username,
                  password: password
                });

                user.save(function(err) {
                  if (err) return next(err);
                  callback(null, user);
                });
              }
            }
          ], function(err, user) {
            if (err) return next(err);
            req.session.user = user._id;
            res.send({});
          });
        }

};
