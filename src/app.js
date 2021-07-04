const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');



const login = require('./Routes/login');
const register = require('./Routes/Register');
const logout = require('./Routes/logout');
const user = require('./routes/User');
const course = require('./Routes/course');

//Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Routes
app.use('/api/login',login);
app.use('/api/register',register);
app.use('/api/logoutUser',logout);
app.use('/api/User',user);
app.use('/api/course', course);

// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.set('port', process.env.PORT || 4000);

module.exports = app;