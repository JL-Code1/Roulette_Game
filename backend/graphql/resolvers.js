const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const resolvers = {
    Query: {
        getUser: async (_, { id }, context) => {
            try {
                const decodedUser = await authMiddleware(context);
                console.log("✅ Authenticated User:", decodedUser);
        
                if (!decodedUser) throw new Error("Authentication required.");
        
                const user = await User.findById(id);
                if (!user) throw new Error("User not found.");
                
                console.log("✅ Fetched User:", user);
                return user;
            } catch (error) {
                console.error("❌ Error in getUser:", error.message);
                throw new Error("Failed to fetch user.");
            }
        },
    },
    
    Mutation: {
        register: async (_, { username, email, password }) => {
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("Email is already in use. Please login.");
                }

                const user = await User.create({ username, email, password });
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return { token, user };
            } catch (error) {
                console.error("❌ Error in register:", error.message);
                throw new Error("Registration failed.");
            }
        },

        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) throw new Error("Invalid credentials (User not found).");

                const isMatch = await user.comparePassword(password);
                if (!isMatch) throw new Error("Invalid credentials (Password incorrect).");

                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return { token, user };
            } catch (error) {
                console.error("❌ Error in login:", error.message);
                throw new Error("Login failed.");
            }
        },

        placeBet: async (_, { amount, betType }, context) => {
            try {
                // ✅ Fix: Ensure user is correctly authenticated (Added `await`)
                const decodedUser = await authMiddleware(context);
                if (!decodedUser) throw new Error("Authentication required.");

                const user = await User.findById(decodedUser.id);
                if (!user) throw new Error("User not found.");

                if (user.balance < amount) throw new Error("Insufficient balance.");

                user.balance -= amount;
                await user.save();

                return { message: `Bet placed on ${betType} for $${amount}.` };
            } catch (error) {
                console.error("❌ Error in placeBet:", error.message);
                throw new Error("Bet placement failed.");
            }
        },
    },
};

module.exports = resolvers;



  // "data": {
//    "login": {
  //    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmY4NWQwYzdkYTJiMTE1ZGU1MTQwMCIsImlhdCI6MTc0MDc1NzI4NX0.zuSLZju0oDFq5YJ6NSpzCUnERic2XicJUt7VPCziHuM",
    //  "user": {
      //  "id": "67bf85d0c7da2b115de51400",
      //  "username": "testUser",
       // "email": "test@example.com"

   //    const jwt = require("jsonwebtoken");

