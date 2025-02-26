const User = require("../models/User");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            } catch (error) {
                console.error("❌ Error in getUser:", error.message);
                throw new Error("Failed to fetch user.");
            }
        }
    },

    Mutation: {
        register: async (_, { username, email, password }) => {
            console.log("📝 Raw Password Before Storing (No Manual Hashing):", password);

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Email is already in use. Please login.");
            }

            // Don't manually hash password here! Mongoose does it in pre('save')
            const user = await User.create({ username, email, password });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Invalid credentials (User not found).");
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error("Invalid credentials (Password incorrect).");
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        }
    }
};

module.exports = resolvers;
