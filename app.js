const express = require('express');
const app = express();
const path = require('path');

global.__root = __dirname + '/';
const AuthController = require('./auth/AuthController');
const UserController = require('./user/UserController');

app.use('/api/auth', AuthController);

module.exports = app;