const jwt = require("jsonwebtoken");

const authMiddleware = async (context) => {
    try {
        if (!context.req || !context.req.headers.authorization) {  // ✅ Ensure req is defined
            console.error("🚨 No Authorization header found.");
            throw new Error("Authentication required.");
        }

        const token = context.req.headers.authorization.split(" ")[1];
        console.log("🔍 Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded User ID:", decoded.id);
        
        return decoded;
    } catch (error) {
        console.error("❌ AuthMiddleware Error:", error.message);
        throw new Error("Invalid token or authentication failed.");
    }
};

module.exports = authMiddleware;



