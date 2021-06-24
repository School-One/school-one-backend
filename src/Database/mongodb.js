const mongoose = require('mongoose');

const db = mongoose.connection;

require('dotenv').config();

//const pass = process.env.PASS;

const CONNECTION_URI ="mongodb+srv://fazt:fazt@cluster0.wr5n9.mongodb.net/college?retryWrites=true&w=majority";

function connectDB(){

    mongoose.connect(CONNECTION_URI,{

        useNewUrlParser : true,

        useUnifiedTopology : true,

        useCreateIndex : true

    });

    db.on('open', _ =>{

        console.log("Database connected");

    });

    db.on('error', err =>{

        console.log("Error:",err);

    });

}

connectDB();

module.exports = mongoose;