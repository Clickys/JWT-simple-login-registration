const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJwt.js');
// security middlewares
const rateLimit = require('express-rate-limit');
const timeout = require('connect-timeout');
const helmet = require('helmet');
const {
    validateRegister,
    registerController,
    loginController,
} = require('../controllers/authController.js');
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
router.use(helmet());
router.post('/register', validateRegister, registerController);
router.post('/login', loginController);

router.get('/protected', timeout('5s'), authenticateJWT, (req, res) => {
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
