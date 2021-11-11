const { Schema, model } = require('mongoose');

const homeworkSchema = new Schema({

    curse_id: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User', 
        required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    answers: [
        {
            
            type: Schema.Types.ObjectId, ref: 'Answer'
        }
    ],

}, { timestamps: true } );

module.exports = model('Homework', homeworkSchema);