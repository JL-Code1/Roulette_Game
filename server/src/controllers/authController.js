const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (_, { username, email, password }) => {
    try {
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            throw new Error("Email is already in use. Please login.");
        }

        const user = await User.create({ username, email, password, balance: 1000 });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { token, user };
    } catch (error) {
        throw new Error("Registration failed.");
    }
};

const login = async (_, { email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials (User not found).");

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid credentials (Password incorrect).");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { token, user };
    } catch (error) {
        throw new Error("Login failed.");
    }
};

module.exports = { register, login };