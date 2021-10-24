const {Schema, model} = require('mongoose');

const gradeSchema = new Schema({

    grade: { type: String, required: true },
    section: { type: String, required: true },
    tutor_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = model('Grade', gradeSchema);