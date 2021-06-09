const { Schema, model } = require('mongoose');

const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cellphone:{
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    admin:{
        type: Boolean,
        required: true,
        default: false},
}, { timestamps: true } );

//encriptar

userSchema.methods.generateHash = (password) => {//Encriptar una contraseña
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10), null);
};

//desencriptar

userSchema.methods.comparePassword = function (password){
    return bcryptjs.compareSync(password, this.password);
};

module.exports = model('User', userSchema);