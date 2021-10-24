const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema({
    attented: { type: Boolean },
    absence_justified: { type: Boolean },
    absence_unjustified: { type: Boolean },
    delay_justified: { type: Boolean },
    delay_injustified: { type: Boolean },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = model('Attendance', attendanceSchema);