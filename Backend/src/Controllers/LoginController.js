const userLogin = {};

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../Models/User');

userLogin.loginUser = async(req, res) =>{

    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({username}, function(err, user){

            if(!user){
                return res.status(400).send({
                    ok:false,
                    err:{
                        message:'Invalid User'
                    }
                })
            }
    
            if(!bcryptjs.compareSync(password,user.password)){
                return res.status(400).send({
                    ok:false,
                    err:{
                        message:'Wrong Password'
                    }
                })
            }

            let token = jwt.sign({
                usuariobd: user
            },'secret',{expiresIn:'8h'})
    
            res.send({
                ok:true,
                usuariobd: user,
                token
            })

        });

    } catch (error) {
        res.send(error);
    }

}

module.exports = userLogin;