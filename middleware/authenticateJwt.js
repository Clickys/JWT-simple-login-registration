const Cookies = require('cookies');
const cookies = require('cookies');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const authenticateJWT = async (req, res, next) => {
    const token = new Cookies(req, res).get('jwt');
    if (!token) {
        return res.status(401).redirect('/login');
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.redirect('/login');
    }
};

module.exports = authenticateJWT;
