var mongoose = require('mongoose');
var config = require('../config');

// mongoose.connect('mongodb://localhost/chat');
mongoose.connect(
  config.get('mongoose:uri'), // 'mongoose:uri' через двоеточие -> синтаксис nconf
  config.get('mongoose:options')
);

module.exports = mongoose;
