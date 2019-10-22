//const mongoose = require('mongoose');
const mongoose = require('mongoose').set('debug', true);

const {Schema} = mongoose;

const GanadoSchema = new Schema({
    _id: String,
    alias: String,
    sex: String,
    weight: String,
    age: String,
    breed: String,
    type: String,
    vaccs: String,
    calf: String,
    iron: String,
    details: String,
    observations: String,
    device_id: String,
    zone_id: String
});

module.exports = mongoose.model('Ganado', GanadoSchema, 'ganado');