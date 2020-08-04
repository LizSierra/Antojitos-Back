/*jshint esversion: 8*/
const express = require('express');
const app = express();


app.use('/persona', require('./persona/persona'));
app.use('/categoria', require('./categoria/categoria'));

module.exports = app;