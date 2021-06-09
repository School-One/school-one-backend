const userRegister = {};

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

userRegister.registerUser = async(req, res) =>{

    const { name, lastname, username, cellphone, password, admin, confirmPassword } = req.body;

    const user = await User.findOne({username});

    if(password == confirmPassword){

        if(!user){

            const newUser = new User();

            newUser.name = name;
            newUser.lastname = lastname;
            newUser.username = username;
            newUser.cellphone = cellphone;
            newUser.password = newUser.generateHash(password);
            newUser.admin = admin;

            await newUser.save();

            if(newUser){
                res.json({message: 'New user has been created'});
            }

        }
        else{
            res.json({message: 'This username is already take'});
        }
    }else{
        res.json({message: 'The password and Confirm password doesnt coincide' });
    }



}

module.exports = userRegister;