const userResolvers = require('./users');
const courseResolvers = require('./courses');
const gradeResolvers = require('./grades');
const homeworkResolvers = require('./homeworks');
const eventResolvers = require('./events');
const dateResolver = require('./date');

module.exports = {

    Date: dateResolver,

    Homework: {
        answerCount: (parent) => parent.answers.length,
    },

    Query: {

        ...userResolvers.Query,
        ...courseResolvers.Query,
        ...gradeResolvers.Query,
        ...homeworkResolvers.Query,
        ...eventResolvers.Query

    },

    Mutation: {

        ...userResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...gradeResolvers.Mutation,
        ...homeworkResolvers.Mutation,
        ...eventResolvers.Mutation,
        
    }

}