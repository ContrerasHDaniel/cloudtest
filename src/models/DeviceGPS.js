const mongoose = require('mongoose');

const {Schema} = mongoose;

const DeviceGPSSchema = new Schema({
    name: {type: String, required:true},
    group_id: {type: String},
    lat : {type: String, required: true},
    lng: {type: String, required: true}
});

module.exports = mongoose.model('DeviceGPS', DeviceGPSSchema);