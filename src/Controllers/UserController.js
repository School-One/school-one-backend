const userCtrl = {};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

const { verificarToken } = require("../middlewares/authentication");

userCtrl.getUsers =  async (req, res) =>{

    const users = await User.find();

    res.json(users);

}

userCtrl.getUser = async (req, res) => {

    const user = await User.findById(req.param.id);

    res.json(user);

}

userCtrl.updateUser = async (req, res) => {

    const { username, password, name, lastname } = req.body;

    await User.findOneAndUpdate({_id:req.params.id},{

        username,
        password, 
        name,
        lastname

    });
    res.json({message: 'User Updated'})

}

userCtrl.deleteUser = async (req, res) =>{

    await User.findByIdAndDelete(req.params.id);

    res.json({message: 'User Deleted'})

}

module.exports = userCtrl;