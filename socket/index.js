var log = require('../libs/log')(module);
var socket = require('socket.io');

module.exports = function(server) {

  var io = socket(server);

  // Options
  io.set('origins', 'localhost:*'); // Установка доменов, которые могут подключиться к текущему сервису
  // Подключения должны быть только с текущего сервера
  // Сайт, который на текущем домене, сможет подключиться к текущему веб-сервису

  // io.sockets.on('connection', function(socket) {  // socket - объект, к-й связан с данным клиентом.
  //   // Он может передавать ему сообщения методом emit
  //   // socket.emit('news', { hello: 'world' });   // emit генерирует событие news c данными
  //   socket.on('message', function(text, cb) {     // on слушает событие (получение сообщений/данных от клиента)
  //     socket.broadcast.emit('message', text);     // такой вызов отправит сообщение всем подписаным соединениям кроме данного
  //     cb(text);
  //   });
  // });

  io.on('connection', function(socket) {

    socket.on('addme', function(username){
      socket.username = username;
      socket.emit('chat', 'SERVER', 'You have connected');
      socket.broadcast.emit('chat', 'SERVER', username + ' is on desk');
    });

    socket.on('message', function(data){
      io.sockets.emit('message', data);
    });

    socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', function(){
      io.sockets.emit('chat', 'SERVER', socket.username + ' has left the chat');
    });

  });

};
