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

// Register post controller

const registerController = async (req, res) => {
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
        res.redirect('/success-registration');
    } catch (error) {
        errorStatus = {
            emailError: '',
            passwordError: '',
        };

        if (error.errors) {
            if (error.errors.email && error.errors.email.message) {
                errorStatus.emailError = error.errors.email.message;
            }
            if (error.errors.password && error.errors.password.message) {
                errorStatus.passwordError = error.errors.password.message;
            }
        }
        res.status(400).render('pages/register', errorStatus);
    }
};

// login post controller

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            email,
        });

        if (user) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordMatch) {
                let expiryDate = new Date();
                expiryDate.setTime(expiryDate.getTime() + 2 * 60 * 1000); // 2 minutes in the future

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
                    expires: expiryDate,
                });
                res.status(200).render('pages/success-login');
            } else {
                res.status(401).render('pages/login', {
                    error: 'User not found',
                });
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
