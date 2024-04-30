const Match = require('../schemas/matchSchema');
const Team = require('../schemas/teamSchema');

const createMatch = async (req, res) => {
    try {
        const {team1, team2, date, start_time, result} = req.body;
        if (!team1 || !team2 || !date || !start_time || !result) {
            return res.status(400).json('Please fill all fields');
        }
        //Getting team ids
        const team1_obj = await Team.findOne({short_name: team1});
        const team2_obj = await Team.findOne({short_name: team2});
        if (!team1_obj || !team2_obj) {
            return res.status(400).json('Invalid team names');
        }
        
        const team1_id = team1_obj._id;
        const team2_id = team2_obj._id;

        const existingMatch = await Match.findOne({team1: team1_id, team2: team2_id, date, start_time});
        if (existingMatch){
            return res.status(400).json('This match already exists');
        }

        const match = await Match.create({
            team1: team1_id,
            team2: team2_id,
            date,
            start_time,
            result
        })
        res.status(201).json('Match created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

const getMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate('team1').populate('team2');
        res.status(200).json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

module.exports = {createMatch, getMatches};