const { Schema, model } = require('mongoose');

const reminderSchema = new Schema({

    homework_id: { type: Schema.Types.ObjectId, ref: 'Homework' },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
    title: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    students: [
        {
            _id: false,
            student_id: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        }
    ]

});

module.exports = model('Reminder', reminderSchema);