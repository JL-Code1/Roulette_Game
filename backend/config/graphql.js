const { ApolloServer, gql } = require("apollo-server-express");

// GraphQL Schema (typeDefs)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => "Welcome to the Roulette GraphQL API! 🎰",
  },
};

// Apollo GraphQL
const setupGraphQL = (app) => {
    const server = new ApolloServer({ typeDefs, resolvers });

    // Start the Apollo Server before applying middleware
    server.start().then(() => {
        server.applyMiddleware({ app });
        console.log("✅ GraphQL Server Ready at /graphql");
    });
};

module.exports = setupGraphQL;
