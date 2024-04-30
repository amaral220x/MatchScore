const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        select: false

    },
    password:{
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;