const Homework = require('../../Models/Homework');
const Course = require('../../Models/Courses');
const Reminder = require('../../Models/Reminders');
const checkAuth = require('../../Util/check_auth');
const { UserInputError } = require('apollo-server');
const { findById } = require('../../Models/Reminders');

module.exports = {

    Query: {

        async getHomeworks(_, { courseId, userId }) {

            try {
                
                const homeworks = await Homework.find({
                    $and: [
                        {"curse_id": courseId},
                        {"createdBy": userId}
                    ]
                });

                return homeworks;

            } catch (err) {
                
                throw new Error(err);

            }

        },
        async getHomework(_, { courseId, homeworkId }){

            try {
                
                const course = await Course.findById(courseId);

                if(course) {

                    const homework = await Homework.findById(homeworkId);

                    return homework;

                }

            } catch (err) {
                throw new Error(err);
            }

        }
    },

    Mutation: {

        async createHomework(_, { courseId, title, content, endDate }, context) {

            const user = checkAuth(context);

            if(!user.rol === "Profesor") {

                throw new Error('No puedes crear tareas porque no eres el profesor!');

            }

            const newHomework = new Homework({

                curse_id: courseId,
                title: title,
                content: content,
                createdBy: user.id

            });

            const res = await newHomework.save();

            const course = await Course.findById(courseId);

            if(res) {
                const newReminder = new Reminder({
                    homework_id: res.id,
                    title: res.title,
                    endDate: endDate,
                    students: course.students,
                });
                
                await newReminder.save();
            }

            return res;

        },

        async answerHomework(_, { homeworkId, studentAnswer }, context) {

            const user = checkAuth(context);

            try {
                
                const homework = await Homework.findById(homeworkId);

                if(homework){

                    homework.answers.unshift({
                        student_id: user.id,
                        student_answer: studentAnswer,
                        submitAt: new Date().toISOString(),
                    });

                    await homework.save();

                    return 'Respondido correctamente';

                }else throw new UserInputError('Tarea no encontrada');

            } catch (err) {
                
            }

        }

    }

}