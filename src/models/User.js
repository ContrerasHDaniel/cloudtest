const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    //id: {type: String, required: true},
    name: {type: String, required: true},
    //lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
    //contract: {type: Date, required: true}
});

UserSchema.methods.encryptPassword = async (password)=>{
    // crear hash
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
