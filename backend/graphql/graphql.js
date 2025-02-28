const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const setupGraphQL = async (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }) // ✅ Ensure request context is passed
    });

    await server.start();
    server.applyMiddleware({ app });
    console.log("✅ GraphQL ready at /graphql");
};

module.exports = setupGraphQL;

