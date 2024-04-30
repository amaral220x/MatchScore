const { get } = require('mongoose');
const User = require('../schemas/userSchema');
const {hashPassword, comparePassword} = require('../utils/authHash');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Hello from the backend!');
}

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json('Please fill all fields');
        }
        if (password.length < 6) {
            return res.status(400).json('Password must be at least 6 characters long');
        }
        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});
        if (existingEmail){
            return res.status(400).json('An account with this email already exists');
        }
        if (existingUsername){
            return res.status(400).json('An account with this username already exists');
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            username,
            email,
            password : hashedPassword
        })
        res.status(201).json('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    
    }

}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json('Please fill all fields');
        }

        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json('Invalid credentials');
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json('Invalid credentials');
        }
        const token = await jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                console.error(err);
                res.status(500).json('Server error');
            }
            res.cookie('token', token).json('Login successful');
        });
        //res.status(200).json('Login successful');

    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }

}

const getProfile = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('Unauthorized');
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(401).json('Unauthorized');
        }
        res.status(200).json(user);
    });
} 

const logout = (req, res) => {
    res.clearCookie('token').json('Logged out');
}


module.exports = {test, registerUser, loginUser, getProfile, logout};