const Homework = require('../../Models/Homework');
const Course = require('../../Models/Courses');
const Reminder = require('../../Models/Reminders');
const Answer = require('../../Models/Answer');
const checkAuth = require('../../Util/check_auth');
const { UserInputError } = require('apollo-server');
const moment = require('moment');

module.exports = {

    Query: {

        async getHomeworks(_, { courseId, userId }) {

            try {

                const course = await Course.find({
                    $and: [
                        {'_id': courseId},
                        {'students._id': userId}
                    ]
                })

                if(course) {

                    let homeworks;

                    const answers = await Answer.find();

                    if(answers){
                        await Homework.find({"curse_id": courseId})
                        .populate('answers').then(p => {
                            homeworks = p;
                        });
                    }else {
                        homeworks = await find({"curse_id": courseId});
                    }

                    return homeworks;
                }
                
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

        async createHomework(_, { courseId, title, content, startDate }, context) {

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
                    course_id: res.curse_id,
                    title: res.title,
                    startDate: moment(new Date()).toDate(),
                    students: course.students,
                });
                
                await newReminder.save();
            }

            return res;

        },

        // async deleteHomework(_, { courseId }) {

        //     try {
                
                

        //     } catch (err) {
        //         throw new Error(err);
        //     }

        // },

        async answerHomework(_, { homeworkId, studentAnswer }, context) {

            const user = checkAuth(context);

            try {
                
                const homework = await Homework.findById(homeworkId);

                if(homework){

                    const answer = new Answer({
                        homework: homework.id,
                        student_id: user.id,
                        student_answer: studentAnswer,
                        submitAt: moment(new Date()).toDate(),
                    });

                    const answerCreated = await answer.save();

                    let answerId = answerCreated.id;

                    if(answerCreated) {
                        homework.answers.unshift(
                            answerId
                        );
    
                        await homework.save();
                    }

                    return 'Respondido correctamente';

                }else throw new UserInputError('Tarea no encontrada');

            } catch (err) {
                
            }

        },

    }

}