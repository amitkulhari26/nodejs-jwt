require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyToken = function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) return res.status('401').send({ 'auth': false, message: 'No Token Provided' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETKEY, (error, payload) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ 'auth': false, message: 'Failed to Authnticate Token' });
        } else {
            req.user = payload;
            next();
        }
    });
};