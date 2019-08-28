const mongoose = require('mongoose');

const {Schema} = mongoose;

const ZonaSchema = new Schema({
    _id: String,
    id_empresa: String,
    nombre: String,
    lat: String,
    lng: String
});

module.exports = mongoose.model('Zona', ZonaSchema);