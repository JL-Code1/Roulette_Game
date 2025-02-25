const { gql } = require("apollo-server-express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GraphQL Schema (typeDefs)
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

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
    `;

    const resolvers = {
        Query: {
            getUser: async (_, { id }) => {
                return await User.findById(id);
            }
        },
        Mutation: {
            register: async (_, { username, email, password }) => {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({ username, email, password: hashedPassword });
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return { token, user };
            },
            login: async (_, { email, password }) => {
                const user = await User.findOne({ email });
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    throw new Error("Invalid credentials");
                }
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return { token, user };
            }
        }
    };

    module.exports = { typeDefs, resolvers };