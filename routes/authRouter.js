const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJwt.js');

const {
    validateRegister,
    registerController,
    loginController,
} = require('../controllers/authController.js');

router.post('/register', validateRegister, registerController);
router.post('/login', loginController);

router.get('/protected', authenticateJWT, (req, res) => {
    res.send('Protected route');
});

router.get('/', (req, res) => {
    res.render('pages/main');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});
module.exports = router;
