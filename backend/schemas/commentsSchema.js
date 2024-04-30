const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./userSchema');
const MatchModel = require('./matchSchema');

const CommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    match:{
        type: Schema.Types.ObjectId,
        ref: 'match'
    },
    comment:{
        type: String,
        required: true
    }
});

const CommentModel = mongoose.model('comment', CommentSchema);
module.exports = CommentModel;