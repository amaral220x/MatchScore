const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logout} = require('../controllers/authController');
const {createTeam, getTeams} = require('../controllers/teamController');
const {createMatch, getMatches} = require('../controllers/matchController');
const {createComment, getComment, deleteComment} = require('../controllers/commentsController');

router.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/logout', logout);
router.post('/team', createTeam);
router.get('/team', getTeams);
router.post('/match', createMatch)
router.get('/match', getMatches);
router.post('/comment', createComment);
router.get('/comment', getComment);
router.delete('/comment', deleteComment);

module.exports = router;