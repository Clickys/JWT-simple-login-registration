const express = require('express');
const app = express(); // create express app
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // init dotenv for environment variables

// declare routes

const authRoutes = require('./routes/authRouter.js');

const PORT = process.env.PORT || 3000;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.y83fdn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// handle JSON bodies
app.use(express.json());

// handle URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
    console.log(`Server is running on port ${PORT}`);
});

app.use('/', authRoutes);
