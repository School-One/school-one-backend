const app = require('./app');
require('dotenv').config();

require('./Database/mongodb');

const port = process.env.PORT;

//Listen Server

const main = async() =>{
    await app.listen(port);
    console.log('server on port: ', port);
}

main();