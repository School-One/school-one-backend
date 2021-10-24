const userResolvers = require('./users');
const courseResolvers = require('./courses');
const gradeResolvers = require('./grades');
const homeworkResolvers = require('./homeworks');
const eventResolvers = require('./events');
const dateResolver = require('./date');

module.exports = {

    Date: dateResolver,

    Query: {

        ...userResolvers.Query,
        ...courseResolvers.Query,
        ...gradeResolvers.Query,
        ...homeworkResolvers.Query,

    },

    Mutation: {

        ...userResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...gradeResolvers.Mutation,
        ...homeworkResolvers.Mutation,
        ...eventResolvers.Mutation,
        
    }

}