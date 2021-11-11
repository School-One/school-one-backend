const userResolvers = require('./users');
const courseResolvers = require('./courses');
const gradeResolvers = require('./grades');
const homeworkResolvers = require('./homeworks');
const eventResolvers = require('./events');
const dateResolver = require('./date');
const reminderResolvers = require('./reminders');
const answerResolvers = require('./answers');

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
        ...eventResolvers.Query,
        ...reminderResolvers.Query,
        ...answerResolvers.Query,

    },

    Mutation: {

        ...userResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...gradeResolvers.Mutation,
        ...homeworkResolvers.Mutation,
        ...eventResolvers.Mutation,
        ...answerResolvers.Mutation,
        
    }

}