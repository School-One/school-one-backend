const userRegister = {};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

userRegister.registerUser = async(req, res) =>{

    const { name, lastname, username, cellphone, email, rol, password, confirmPassword } = req.body;

    const user = await User.findOne({username});

    if(password == confirmPassword){

        if(!user){

            const newUser = new User();

            newUser.name = name;
            newUser.lastname = lastname;
            newUser.username = username;
            newUser.cellphone = cellphone;
            newUser.email = email;
            newUser.rol = rol;
            newUser.password = newUser.generateHash(password);

            const createdUser = await newUser.save();

            let token = jwt.sign({
                id: createdUser._id,
                name: createdUser.name,
                lastname: createdUser.lastname,
                username: createdUser.username,
                cellphone: createdUser.cellphone,
                email: createdUser.email,
                rol: createdUser.rol,
                isAdmin: createdUser.isAdmin,
            }, process.env.JWT_SECRET || 'something secret',{expiresIn:'1h'})

            if(createdUser){
                res.send({
                    _id: createdUser._id,
                    name: createdUser.name,
                    lastname: createdUser.lastname,
                    username: createdUser.username,
                    cellphone: createdUser.cellphone,
                    isAdmin: createdUser.isAdmin,
                    token: token,
                });
            }else{
                res.status(401).send({message: 'Cant create a new user D:'});
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