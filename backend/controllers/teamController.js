const Team = require('../schemas/teamSchema');

const createTeam = async (req, res) => {
    try {
        const {short_name, full_name} = req.body;
        if (!short_name || !full_name) {
            return res.status(400).json('Please fill all fields');
        }
        const existingTeam = await Team.findOne({short_name});
        if (existingTeam){
            return res.status(400).json('A team with this short name already exists');
        }
        const team = await Team.create({
            short_name,
            full_name
        })
        res.status(201).json('Team created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    
    }
}

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}

module.exports = {createTeam, getTeams};