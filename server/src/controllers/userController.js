const User = require("../models/User");

const getUser = async (_, { id }) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found.");

        return user;
    } catch (error) {
        console.error("❌ Error in getUser:", error.message);
        throw new Error("Failed to fetch user.");
    }
};

module.exports = { getUser };