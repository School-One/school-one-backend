const app = require('./app');
require('dotenv').config();

require('./Database/mongodb');

//Listen Server

const main = async() =>{
    await app.listen(app.get('port'));
    console.log('server on port: ', app.get('port'));
}

main();