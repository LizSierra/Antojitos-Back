/*jshint esversion: 8*/
const express = require('express');
const app = express();
const functions = require('../../functions/persona/persona');

app.get('', (req, res) => {
    functions.fnObtenerUsuarios()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.get('/:id', (req, res) => {
    functions.fnObtenerUsuario(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post('', (req, res) => {
    functions.fnInsertarUsuario(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = app;