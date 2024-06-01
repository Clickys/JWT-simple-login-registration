const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail, isStrongPassword } = require('validator');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: { is: true, message: 'Email is required' },
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Minimum password length is 8 characters'],
        maxLength: [32, 'Maximum password length is 32 characters'],
        // select: false,
        // validate: [
        //     isStrongPassword,
        //     'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        // ],
    },
});
userSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

// Using prehook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

mongoose.model('User', userSchema);

const User = mongoose.model('User');

module.exports = User;
