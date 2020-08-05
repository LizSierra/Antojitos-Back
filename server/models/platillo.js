const mongoose = require('mongoose');
const { boolean, number } = require('joi');
const Categoria = require('./categoria');
let Schema = mongoose.Schema;

let PlatilloSchema = new Schema({

    idCategoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },

    strNombre: {
        type: String,
        required: [true, 'Ingresa el nombre']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Ingresa su descripción']
    },
    strIngredientes: {
        type: String,
        required: [true, 'Ingresa los ingredientes']
    },
    nmbPiezas: {
        type: Number,
        required: [true, 'Ingresa el número de piezas']
    },
    nmbPrecio: {
        type: Number,
        required: [true, 'Ingresa el precio']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Platillo', PlatilloSchema);