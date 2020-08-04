/*jshint esversion: 8*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const strMongoUrl = require('./variablesGlobales');

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 500000 }));
app.use(bodyParser.json({ limit: '100mb' }));


try {
    mongoose.connect(strMongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('DB Online');

} catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
}


app.use('/api', require('./directions/directions'));


app.use((err, req, res, next) => {
    res.status(400).json({ intStatus: 6, strAnswer: 'error en la peticion' + err });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});