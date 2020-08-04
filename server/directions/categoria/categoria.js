const express = require('express');
const Categoria = require('../../models/categoria');
const _ = require('underscore');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => {

    Categoria.find()
        .then((data) => {
            if (data.length <= 0) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    msg: 'No existen Categorias',
                });
            }

            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han obtenido correctamente las categorias',
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

    Categoria.findById(id)
        .then((data) => {

            if (data.length <= 0) {
                return res.status(404).json({
                    ok: true,
                    status: 404,
                    msg: 'No hay categorias registradas',
                    count: data.length,
                    cont: data
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha consultado correctamente las categorias',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al obtener las categorias',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

app.post('/registrar', (req, res) => {

    let categoria = new Categoria(req.body);

    Categoria.find({ 'strNombre': categoria.strNombre }).then((data) => {
        if (data.length > 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'El sector ya fue ingresado, favor registrar otro.',
            });
        }



        Categoria.findOne({ 'strNombre': categoria.strNombre }).then((data) => {

            if (data) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Este tipo de salario ya existe'
                });
            }

            categoria.save()
                .then((resp) => {
                    res.status(200).send({
                        estatus: '200',
                        err: false,
                        msg: 'Success: Información insertada correctamente.',
                        cont: {
                            resp
                        }
                    });
                }).catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        status: 400,
                        msg: 'Error al registrar el sector',
                        err: Object.keys(err).length === 0 ? err.message : err
                    });
                });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            ok: false,
            status: 400,
            msg: 'Ha ocurrido un error con el servidor',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });


});


app.put('/modificar/:id', (req, res) => {
    let id = req.params.id;

    const categoria = new Categoria({
        'strNombre': req.body.strNombre,
        'strDescripcion': req.body.strDescripcion
    });

    Categoria.findOneAndUpdate({ '_id': id, $set: categoria })
        .then((data) => {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'La ategoria se actualizo correctamente.',
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

    Categoria.findByIdAndUpdate(id, { blnActivo: false })
        .then((data) => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha desactivado correctamente la categoria',
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al desactivar la categoria',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

module.exports = app;