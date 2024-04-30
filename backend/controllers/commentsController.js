const Comment = require('../schemas/commentsSchema'); 
const User = require('../schemas/userSchema');
const Match = require('../schemas/matchSchema')

const createComment = async(req, res) =>{
    try {
        const {user_id, match_id, comment} = req.body;
        if (!user_id || !match_id || !comment){
            return res.status(400).json('Please fill all fields');
        }
        const user = await User.findById(user_id);
        const match = await Match.findById(match_id);
        if (!user || !match){
            return res.status(400).json('Invalid user or match');
        }
        const newComment = await Comment.create({
            user: user_id,
            match: match_id,
            comment
        });
        res.status(201).json('Comment created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
}

const getComment = async(req, res) =>{
    try {
        // Remove the email and password field from the user object
        const comments = await Comment.find().populate('user').select('+email +password').populate('match');
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
}

const getCommentByMatch = async(req, res) =>{
    try {
        const match_id = req.params.id;
        const comments = await Comment.find({match: match_id}).populate('user').populate('match');
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
}

const deleteComment = async(req, res) =>{
    try {
        const comment_id = req.params.id;
        const comment = await Comment
            .findByIdAndDelete(comment_id);
        if (!comment){
            return res.status(404).json('Comment not found');
        }
        res.status(200).json('Comment deleted successfully');
    }   
    catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
}

module.exports = {createComment, getComment, getCommentByMatch, deleteComment};