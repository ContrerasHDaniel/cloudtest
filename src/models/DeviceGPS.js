
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const SchemaType =mongoose.Schema.Types;

const {Schema} = mongoose;

const positionSchema = new Schema({
    _id: Date, 
    lat: SchemaType.Double, 
    lng: SchemaType.Double
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