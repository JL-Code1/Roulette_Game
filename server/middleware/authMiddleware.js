const jwt = require("jsonwebtoken");

const authMiddleware = (headers) => {
    try {

        if (!headers || !headers.authorization) {
            throw new Error("No Authorization header found.");
        }

        const token = headers.authorization.split(" ")[1]; // Extract the token
        if (!token) throw new Error("❌ Token missing");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded; // Return decoded user
    } catch (error) {
        console.error("❌ Authentication Error:", error.message);
        throw new Error("Authentication failed");
    }
};

module.exports = authMiddleware;
