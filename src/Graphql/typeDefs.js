const { gql } = require('apollo-server');

module.exports = gql`

    scalar Date

    type User {

        id: ID!
        name: String!
        lastname: String!
        cellphone: Int!
        email: String!
        rol: String!
        password: String!
        createdAt: String!
        token: String!
    }

    type Grade {

        id: ID!
        grade: String!
        section: String!
        tutor_id: ID!

    }

    type Student {

        student_id: ID!
        addedAt: Date!

    }

    type Course {

        id: ID!
        name: String!
        grade_section: ID!
        teacher_id: ID!
        students: [Student!]

    }

    type Event {

        id: ID!
        start: Date!
        end: Date!
        title: String!

    }

    type Attendance {

        id: ID!
        attented: Boolean!
        absence_justified: Boolean!
        absence_unjustified: Boolean!
        delay_justified: Boolean!
        delay_injustified: Boolean!
        student: User

    }
    
    type Homework {

        id: ID!
        curse_id: ID!
        title: String!
        content: String!
        answers: [Answer]

    }

    type Answer {
        
        student_id: ID!
        student_answer: String!

    }

    input registerInput {

        email: String!
        password: String!
        confirmPassword: String!

    }

    type Query {

        getUsers: [User]
        getUser(userId: ID!): User
        getCourses(userId: ID!): [Course]
        getGrades: [Grade]
        getHomeworks(courseId: ID!, userId: ID!): [Homework]

    }

    type Mutation {

        login(email: String!, password: String!): User
        registerUser(name: String!, lastname: String!, username: String!, cellphone: Int!, email: String!, rol: String!, password: String!, confirmPassword: String! ): User
        updateUser(userId: ID!, name: String!, lastname: String!, email: String!): User
        deleteUser(userId: ID!): String
        createGrade(grade: String!, section: String!, teacherId: String!): Grade!
        createHomework(courseId: ID!, title: String!, content: String!): Homework
        answerHomework(homeworkId: ID!, studentAnswer: String!): String
        createEvent(title: String!): Event
        createCourse(name: String!, grade_section: ID!, teacherId: ID!): Course
        insertStudents(courseId: ID!, studentId: ID!): String!

    }

`;