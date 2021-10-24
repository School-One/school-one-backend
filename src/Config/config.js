module.exports = {
    MONGODB: process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/college',
    SECRET_KEY: 'some very secret key'
}