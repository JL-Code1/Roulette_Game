const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

const setupGraphQL = async (app) => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    console.log("✅ GraphQL ready at /graphql");
};

module.exports = setupGraphQL;

