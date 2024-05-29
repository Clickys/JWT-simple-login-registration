const { body, validationResult, check } = require('express-validator');
const User = require('../models/user.js');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const validateRegister = [
    body('email').trim().isEmail().withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];
//check type of error
const checkError = (errors) => {
    let emailError = '';
    let passwordError = '';
    errors.array().forEach((error) => {
        if (error.path === 'email') {
            emailError = error.msg;
        }
        if (error.path === 'password') {
            passwordError = error.msg;
        }
    });
    return { emailError, passwordError };
};

// Register post controller

const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/register', checkError(errors));
    }
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        let userCookie = new Cookies(req, res);
        userCookie.set('jwt', token, {
            httpOnly: true,
        });

        res.status(201).json({
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// login post controller

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });

        if (user) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordMatch) {
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2m',
                    }
                );
                const cookies = new Cookies(req, res);
                cookies.set('jwt', token, {
                    httpOnly: true,
                });
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(400).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).render('pages/login', {
                error: 'Invalid credentials',
            });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
module.exports = { validateRegister, registerController, loginController };
