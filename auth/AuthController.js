const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserController = require('../user/UserController');
const verifyToken = require('./auth');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router
    .route('/register')
    .post(UserController.userRegister);

router
    .route('/me')
    .get(verifyToken.verifyToken, UserController.findUser);

module.exports = router;
