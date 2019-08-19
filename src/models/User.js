const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    id: {type: string, required: true},
    name: {type: string, required: true},
    lastname: {type: string, required: true},
    corp: {type: string, required: false}
    //contract: {type: Date, required: true}
});

module.exports = mongoose.model('User', UserSchema);