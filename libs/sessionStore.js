var mongoose = require('./mongoose');
var express = require('express');
var MongoStore = require('connect-mongo')(express);

module.exports = new MongoStore({ mongooseConnection: mongoose.connection });
