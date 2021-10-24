const Grade = require('../../Models/Grades');
const checkAuth = require('../../Util/check_auth');

module.exports = {

    Query: {

        async getGrades() {

            try {
                
                const grades = await Grade.find();

                return grades;

            } catch (err) {
                
                throw new Error(err);

            }

        }

    },

    Mutation: {

        async createGrade(_, { grade, section, teacherId, tutor }, context) {

            try {

                const newGrade = new Grade({
                    
                    grade: grade,
                    section: section,
                    tutor_id: teacherId


                });
                
                const gradeCreated = await newGrade.save();

                return gradeCreated;

            } catch (err) {
                
                throw new Error(err);

            }

        }

    }

}