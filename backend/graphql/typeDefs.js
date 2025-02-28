const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        balance: Float!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type BetResult {
        message: String!
    }

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        placeBet(amount: Float!, betType: String!): BetResult
    }
`;

module.exports = typeDefs;
