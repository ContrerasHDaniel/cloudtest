
const mongoose = require('mongoose');

const {Schema} = mongoose;

const positionSchema = new Schema({lat: String, lng: String});
const DeviceGPSSchema = new Schema({
    _id: String,
    name: String,
    group_id: String,
    position: [positionSchema]
});

module.exports = mongoose.model('DeviceGPS', DeviceGPSSchema);