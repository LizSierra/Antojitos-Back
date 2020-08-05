const express = require('express');
const Platillo = require('../../models/platillo');
const _ = require('underscore');
const app = express();
const mongoose = require('mongoose');
const { BSONType } = require('mongodb');

app.get('/', (req, res) => {

    Platillo.find()
        .then((data) => {
            if (data.length <= 0) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    msg: 'No existen Platillos',
                });
            }

            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han obtenido correctamente los Platillos',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al intenar obtener las categorias',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findById(id)
        .then((data) => {

            if (data.length <= 0) {
                return res.status(404).json({
                    ok: true,
                    status: 404,
                    msg: 'No hay platillos registrados',
                    count: data.length,
                    cont: data
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha consultado correctamente los platillos',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al obtener los platillos',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;
    let platillo = new Platillo({
        idCategoria: body.idCategoria,
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        strIngredientes: body.strIngredientes,
        nmbPiezas: body.nmbPiezas,
        nmbPrecio: body.nmbPrecio,
        blnActivo: body.blnActivo
    });

    platillo.save((err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'El platillo ya existe.'
                }
            });

        }
        res.status(200).json({
            ok: true,
            platillo: resp
        })
    });
})


app.put('/modificar/:id', (req, res) => {
    let id = req.params.id;

    // const categoria = new Categoria({
    //     'strNombre': req.body.strNombre,
    //     'strDescripcion': req.body.strDescripcion
    // });

    let body = _.pick(req.body, ['idCategoria', 'strNombre', 'strDescripcion', 'strIngredientes', 'nmbPiezas', 'nmbPrecio', 'blnActivo']);
    Platillo.findByIdAndUpdate(id, body)
        .then((data) => {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'El platillo se actualizo correctamente.',
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar actualizar ',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

app.patch('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findByIdAndUpdate(id, { blnActivo: false })
        .then((data) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha desactivado correctamente el platillo',
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al desactivar el platillo',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

module.exports = app;