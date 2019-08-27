
const mongoose = require('mongoose');

const {Schema} = mongoose;

const positionSchema = new Schema({
    _id: Date, 
    lat: String, 
    lng: String
});
const DeviceGPSSchema = new Schema({
    _id: String,
    id_ganado: String,
    nombre: String,
    id_zona: String,
    position: [positionSchema],
    carga: String,
    alerta: Boolean
});

module.exports = mongoose.model('DeviceGPS', DeviceGPSSchema);