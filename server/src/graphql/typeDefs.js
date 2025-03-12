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
        betType: String!
        betValue: String!
        message: String!
        winnings: Float!
    }

    type PlaceBetResponse {
        spinResult: Int!
        balance: Float!
        betResults: [BetResult!]!
    }

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        placeBet(bets: [BetInput!]!): PlaceBetResponse
    }

    input BetInput {
        amount: Float!
        betType: String!
        betValue: String!
    }
`;

module.exports = typeDefs;