const User = require("../models/User"); // ✅ Import User model
const authController = require("../controllers/authController");
const betController = require("../controllers/betController");
const userController = require("../controllers/userController");
const getRandomRouletteResult = require("../utils/spinLogic"); // ✅ Ensure correct path
const processBets = require("../utils/processBets"); // ✅ Ensure correct path


const resolvers = {
    Query: {
        getUser: async (_, { id }, context) => {
            if (!context.user) throw new Error("Unauthorized"); 
            return userController.getUser(_, { id }, context);
        },
    },

    Mutation: {
        register: async (_, { username, email, password }) => authController.register(_, { username, email, password }),
        login: async (_, { email, password }) => authController.login(_, { email, password }),

        placeBet: async (_, { bets }, context) => {
          if (!context.user) throw new Error("Unauthorized");

          try {
              const user = await User.findById(context.user.id);
              if (!user) throw new Error("User not found");

              console.log("💰 Initial Balance:", user.balance);

              // Step 1: Spin the wheel
              const spinResult = getRandomRouletteResult();
              console.log("🎯 Winning Number:", spinResult);

              // Step 2: Process bets using `processBets.js`
              const { totalBetAmount, totalWinnings, betResults } = processBets(bets, spinResult, user);

              // Step 3: Check if user has enough balance
              if (user.balance < totalBetAmount) throw new Error("Insufficient balance");
              user.balance -= totalBetAmount;
              user.balance += totalWinnings;
              await user.save();

              console.log("💰 Updated Balance (After Payouts):", user.balance);

              return {
                  spinResult,
                  balance: user.balance,
                  betResults,
              };
          } catch (error) {
              console.error("❌ Error processing bet:", error.message);
              throw new Error("Bet failed");
          }
      },
  },
};

module.exports = resolvers;
