const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamModel = require('./teamSchema');

const matchSchema = new Schema({
    team1:{
        type: Schema.Types.ObjectId,
        ref: TeamModel
    },
    team2:{
        type: Schema.Types.ObjectId,
        ref: TeamModel
    },
    date:{
        type: Date,
        required: true
    },
    start_time:{
        type: String,
        required: true
    },
    result:{
        type: String,
        required: true
    }
});

const MatchModel = mongoose.model('match', matchSchema);

module.exports = MatchModel;