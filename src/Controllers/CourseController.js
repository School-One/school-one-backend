const courseCtrl = {};

const Course = require('../Models/Course');
const User = require('../Models/User');

courseCtrl.getCourses = async(req, res) =>{

    try {
        
        const courses = await Course.find();

        res.send(courses);

    } catch (error) {
        
        res.send(error);

    }

}

courseCtrl.getCourseForAlumn = async(req, res) =>{

    try {
        
        //const course = await Course.find({ 'students._id': req.params.studentid });

        await Course.find({'students._id': req.params.studentid}, function (err, course) {
            User.populate(course, {path: 'teacher'}, function (err, course) {
                res.json(course);
             });
        });

    } catch (error) {
        res.send(error);
    }

}

courseCtrl.getCoursesForTeacher = async(req, res) =>{

    try {
        
        const courses = await Course.find({ "teacher": req.params.id });

        res.send(courses);

    } catch (error) {
        
        res.send(error);

    }

}

courseCtrl.createCourse = async(req, res) => {

    const course = new Course({
        name: req.body.name,
        grade_section: req.body.grade_section,
        teacher: req.body.teacher,
        //teacherDetails: req.body.teacherDetails,
        students: req.body.students,
    });

    const newCourse = await course.save();

    if(newCourse){
        res.status(201).send({ message: 'New Course Created', course: newCourse });
    }else{
        res.send({ message: 'Cant create a course :c' });
    }

}

module.exports = courseCtrl;