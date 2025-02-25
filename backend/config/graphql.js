const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

const setupGraphQL = (app) => {
    const server = new ApolloServer({ typeDefs, resolvers });

    //start the Apollo server
    server.start().then(() => {
        server.applyMiddleware({ app });
        console.log(`✅ GraphQL ready at /graphql`);
    }
    );
}
module.exports = setupGraphQL;
