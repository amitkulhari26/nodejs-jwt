require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const CRUD = require('mysql-crud');
const userCRUD = CRUD(db, 'users');
const expo = module.exports;

expo.userRegister = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 6);
    userCRUD.create({
        'name': req.body.name,
        'password': hashedPassword,
        'email': req.body.email
    }, (error, user) => {
        if (error) return res.status(500).send('Unable to create user');
        const token = jwt.sign({ 'id': user.insertId }, process.env.ACCESS_TOKEN_SECRETKEY, { 'expiresIn': 86400 });
        res.send({ 'auth': true, 'token': token });

    });
};
expo.findUser = (req, res) => {
    userCRUD.load({ id: req.user.id }, { password: '0' }, (error, user) => {
        if (error) return res.status(500).send('There was a problem finding the user');
        console.log(user);
        res.status(200).json(user);
    });
};
expo.loginUser = (req, res) => {
    userCRUD.load({ 'email': req.body.email }, (error, user) => {
        if (error) return res.status(500).send('Server Error');
        if (!user) return res.status(404).send('User not found');
        const passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send('Password is inavalid');
        const token = jwt.sign({ id: user[0].id }, process.env.ACCESS_TOKEN_SECRETKEY, { 'expiresIn': 86400 });
        res.send({ 'auth': true, token: token, user: user[0] });
    });
};