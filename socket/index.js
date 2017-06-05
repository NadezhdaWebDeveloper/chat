var log = require('../libs/log')(module);

module.exports = function(server) {

  var io = require('socket.io').listen(server);

  // Options
  io.set('origins', 'localhost:*'); // Установка доменов, которые могут подключиться к текущему сервису
  // Подключения должны быть только с текущего сервера
  // Сайт, который на текущем домене, сможет подключиться к текущему веб-сервису

  io.set('logger', log);

  io.sockets.on('connection', function(socket) {  // socket - объект, к-й связан с данным клиентом.
    // Он может передавать ему сообщения методом emit
    // socket.emit('news', { hello: 'world' });   // emit генерирует событие news c данными
    socket.on('message', function(text, cb) {     // on слушает событие (получение сообщений/данных от клиента)
      socket.broadcast.emit('message', text);     // такой вызов отправит сообщение всем подписаным соединениям кроме данного
      cb(text);
    });

  });

};
