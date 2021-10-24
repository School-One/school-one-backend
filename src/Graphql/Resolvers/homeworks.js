const Homework = require('../../Models/Homework');
const checkAuth = require('../../Util/check_auth');
const { UserInputError } = require('apollo-server');

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

        }



    },

    Mutation: {

        async createHomework(_, { courseId, title, content }, context) {

            const user = checkAuth(context);

            if(!user.rol == "Profesor") {

                throw new Error('No puedes crear tareas porque no eres el profesor!');

            }

            const newHomework = new Homework({

                curse_id: courseId,
                title: title,
                content: content,
                createdBy: user.id

            });

            const res = await newHomework.save();

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