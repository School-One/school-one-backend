const Course = require('../../Models/Courses');
const User = require('../../Models/Users');

module.exports = {

    Query: {

        async getCourses(_, { userId }) {

            try {
                
                const user = await User.findById(userId);

                if(!user) {
                    throw new Error('Usuario no encontrado');
                }

                let courses = [];

                switch (user.rol) {
                    case 'Estudiante':
                    
                        courses = await Course.find({'students.student_id': userId});

                        return courses;

                    case 'Profesor':

                        courses = await Course.find({'teacher_id': userId});

                        return courses;
                
                    default:
                        return [];
                }

            } catch (err) {
                
                throw new Error(err);

            }

        },

    },
    Mutation: {

        async createCourse(_, { 
            name,
            grade_section,
            teacherId
         }) {

            const newCourse = new Course({

                name,
                grade_section,
                teacher_id: teacherId 

            });

            const course = await newCourse.save();

            return course;

        },
        async insertStudents(_,{
            courseId
            ,studentId
        }) {

            try {
                
                const course = await Course.findById(courseId);
                
                if(course) {

                    course.students.unshift({
                        student_id: studentId,
                        addedAt: new Date().toISOString(),
                    });

                    await course.save();

                    return 'Alumno registrado al curso correctamente';

                }else {
                    throw new Error('Curso no encontrado');
                }

            } catch (err) {
                throw new Error(err);
            }

        }

    }

}