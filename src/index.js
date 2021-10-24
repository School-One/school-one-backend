require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./Config/config');
const typeDefs = require('./Graphql/typeDefs');
const resolvers = require('./Graphql/Resolvers/index');

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose
    .connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: PORT })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })