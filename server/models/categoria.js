const mongoose = require('mongoose');
const { boolean } = require('joi');

let Schema = mongoose.Schema;

let CategoriaSchema = new Schema({

    strNombre: {
        type: String,
        required: [true, 'Ingresa el nombre']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Ingresa su descripción']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Categoria', CategoriaSchema);