const {model, Schema} = require('mongoose');

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    teacherid: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    teacherDetails: [
        {
            name: { type: String, required:true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            cellphone: { type: Number, required: true },
        }
    ],
    students: [
        {
            _id: { type: String, required: true, unique: true },
            name: { type: String, required: true, unique: true },
            lastname: { type: String, required: true },
            incorporated: { type: String, require: true }    
        }
    ]
}, { timestamps: true } );
//db.college.insert({"name":"Matematicas", "teacher": "1", "students": ["1","2"]})
module.exports = model('Course', courseSchema);