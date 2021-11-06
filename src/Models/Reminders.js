const { Schema, model } = require('mongoose');

const reminderSchema = new Schema({

    homework_id: { type: Schema.Types.ObjectId, ref: 'Homework' },
    title: { type: String },
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