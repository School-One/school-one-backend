const userLogin = {};

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

userLogin.loginUser = async(req, res) =>{

    const { username, password } = req.body;
        
    const user = await User.findOne({username});

    if(user){
        if(bcrypt.compareSync(password,user.password)){
            let token = jwt.sign({
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                cellphone: user.cellphone,
                isAdmin: user.isAdmin,
            },'secret',{expiresIn:'8h'})
    
            res.send({
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                cellphone: user.cellphone,
                isAdmin: user.isAdmin,
                token: token,
            });
            return;
        }else{
            res.status(401).send({message: 'Invalid user email or password'});
        }
    }else{
        res.status(401).send({message: 'Invalid user email or password'});
    }


}

module.exports = userLogin;