const { Schema, model } = require('mongoose');

const homeworkSchema = new Schema({

    curse_id: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'Users', 
        required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    answers: [
        {
            _id: false,
            answer_id: { type: Schema.Types.ObjectId },
            student_id: { type: Schema.Types.ObjectId, ref: 'Users', required:true },
            student_answer: { type: String, required: true },
            filePath: { type: String },
            submitAt: { type: Date }
        }
    ]

}, { timestamps: true } );

module.exports = model('Homework', homeworkSchema);