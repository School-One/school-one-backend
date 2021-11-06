const {model, Schema} = require('mongoose');

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    grade_section: {
        type: Schema.Types.ObjectId,
        ref: 'Grades',
        required: true,
    },
    teacher: {
        _id: false,
        teacher_id: { type: Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        email: { type: String },
        cellphone: { type: Number },

    },
    students: [
        {
            _id: false,
            student_id: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            addedAt: { type: Date }
        }
    ],
}, { timestamps: true } );
//db.college.insert({"name":"Matematicas", "teacher": "1", "students": ["1","2"]})
module.exports = model('Course', courseSchema);