const Answer = require('../../Models/Answer');
const Homework = require('../../Models/Homework');
const checkAuth = require('../../Util/check_auth');

module.exports = {

    Query: {

        async getAnswers(_, { page },context){
            
            const user = checkAuth(context);

            const limit = 1;

            try {
                
                if(!user.rol === 'Profesor'){
                    throw new Error('No estas permitido a hacer esto');
                }

                const answers = await Answer.find()
                    .limit(limit * 1)
                    .skip((page - 1) * limit);

                return answers;

            } catch (err) {
                throw new Error(err);
            }

        }

    },

    Mutation: {

        async deleteAnswer(_, { answerId, homeworkId } ){

            try {

                await Homework.findOne({'_id': homeworkId}, function(err, result) {
                    if(err){
                        throw new Error(err);
                    }else {
                        result.answers.pull(answerId);
                        result.save();
                    }
                });

                return 'respuesta eliminada';
                
                //await Answer.findByIdAndRemove(answerId);

            } catch (err) {
                throw new Error(err);
            }

        }

    }
}