/*jshint esversion: 8*/
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var strMongoUrl = require('../../variablesGlobales');

//falta el modelo del usuario para poder insertar los datos.

exports.fnObtenerUsuarios = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(strMongoUrl, { useUnifiedTopology: true }, (err, dbParent) => {
            if (dbParent !== null && dbParent !== undefined) { let db = dbParent.db('prueba'); }
            if (err) {
                reject({ intStatus: 2, strAnswer: "Error en la base de datos" });
            } else {
                db.collection('persona').find().toArray((err, result) => {
                    if (err) {
                        reject(err);
                        dbParent.close();
                    } else {
                        dbParent.close();
                        resolve({ intStatus: 1, jsnAnswer: result[0] });
                    }
                });
            }
        });
    });
};

exports.fnObtenerUsuario = (id) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(strMongoUrl, { useUnifiedTopology: true }, (err, dbParent) => {
            if (dbParent !== null && dbParent !== undefined) { let db = dbParent.db('prueba'); }
            if (err) {
                reject({ intStatus: 2, strAnswer: "Error en la base de datos" });
            } else {
                let query = {
                    '_id': ObjectId(id)
                };
                db.collection('persona').find(query).toArray((err, result) => {
                    if (err) {
                        reject(err);
                        dbParent.close();
                    } else {
                        dbParent.close();
                        resolve({ intStatus: 1, jsnAnswer: result[0] });
                    }
                });
            }
        });
    });
};

exports.fnInsertarUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(strMongoUrl, { useUnifiedTopology: true }, (err, dbParent) => {
            if (dbParent !== null && dbParent !== undefined) { let db = dbParent.db('prueba'); }
            if (err) {
                reject({ intStatus: 2, strAnswer: "Error en la base de datos" });
            } else {}
        });
    });
};