const userLogout = {};

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

userLogout.logoutUser = async(req, res) =>{

    try {
        
        await res.clearCookie("jwt");

        res.json({message: 'Logout successful'});

    } catch (error) {
        res.json(error);
    }

}

module.exports = userLogout;