const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
    start: Date,
    end: Date,
    title: String
});

module.exports = model('Event', EventSchema);