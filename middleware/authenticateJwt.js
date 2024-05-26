const Cookies = require('cookies');
const cookies = require('cookies');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const authenticateJWT = async (req, res, next) => {
    debugger;
    const token = new Cookies(req, res).get('jwt');
    if (!token) {
        return res.status(401).redirect('/login');
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decodedToken.id).lean();
        res.json(user);
        next();
    } catch (error) {
        res.redirect('/login');
        return res.status(403).json({ error: error.message });
    }
};

module.exports = authenticateJWT;
