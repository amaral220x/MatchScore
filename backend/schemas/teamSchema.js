const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const teamSchema = new Schema({
    short_name:{
        type : String,
        required : true,
        unique : true
    },
    full_name:{
        type : String,
        required : true,
    },
});

const TeamModel = mongoose.model('team', teamSchema);

module.exports = TeamModel;
