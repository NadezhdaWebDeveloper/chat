var mongoose = require('./libs/mongoose');
var async = require('async');
// var User = require('./models/user').User;

// Запуск функций последовательно, одну за другой
async.series([
  open,
  dropDatabase,
  requireModels,
  createUser
  // close
], function(err, results){
  console.log(arguments);
  mongoose.disconnect();
});

function open(callback){
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

// ожидание вставки новых пользователей пока индексы не будут полностью созданы
function requireModels(callback){
  require('./models/user');

  async.each(Object.keys(mongoose.models), function(modelName, callback){
    mongoose.models[modelName].ensureIndexes(callback);
    // ensureIndexes - метод, который гарантирует, что как только все индексы будут созданы, будет вызван callback
  }, callback);

}

function createUser(callback){

  // более изящное решение чем async.parallel ---
    var users = [
      { username: 'admin', password: 'admin' },
      { username: 'guest', password: 'guest' },
      { username: 'user', password: 'user' }
    ];

    async.each(users, function(user, callback){
      var user = new mongoose.models.User(user);
      user.save(callback);  // в случае успеха метод save возвращает null, user, affected.
                            // Но метод each отбросит все аргументы кроме первого.
    }, callback);
  // --- end

  // async.parallel([
  //   function(callback){
  //     var admin = new User({ username: 'admin', password: 'admin' });
  //     admin.save(function(err){
  //       callback(err, admin);
  //     });
  //   },
  //   function(callback){
  //     var guest = new User({ username: 'guest', password: 'guest' });
  //     guest.save(function(err){
  //       callback(err, guest);
  //     });
  //   },
  //   function(callback){
  //     var user = new User({ username: 'user', password: 'user' });
  //     user.save(function(err){
  //       callback(err, user);
  //     });
  //   }
  // ], callback);
}

function close(callback){
  // перенесена в последний блок серии вызовов async.series
  mongoose.disconnect(callback);
}



// var user = new User({
//   username: 'Anton',
//   password: 'secret'
// });
//
// user.save(function (err, user, affected) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Success');
//   }
// });
//
// User.findOne({ username: 'Nadezhda' }, function(err, user){
//   if (err) throw err;
//   console.log(user);
// });
