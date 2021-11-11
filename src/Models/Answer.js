const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    homework: { type: Schema.Types.ObjectId, ref: 'Homework', required: true },
    student_id: { type: Schema.Types.ObjectId, ref: 'User', required:true },
    student_answer: { type: String, required: true },
    filePath: { type: String },
    submitAt: { type: Date },
    grade: { type: Number },
    comment: { type: String },
});

module.exports = model('Answer', answerSchema);