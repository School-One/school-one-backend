const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

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
    email: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        trim: true,
        default: "Estudiante",
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true } );

//encriptar

userSchema.methods.generateHash = (password) => {//Encriptar una contraseña
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//desencriptar

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', userSchema);