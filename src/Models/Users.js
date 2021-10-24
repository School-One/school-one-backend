const { Schema, model } = require('mongoose');

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

module.exports = model('User', userSchema);