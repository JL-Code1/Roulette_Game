const User = require("../models/User");
const processBets = require("../utils/processBets");
const getRandomRouletteResult = require("../utils/spinLogic"); // Import spin logic function

const placeBet = async (_, { bets }, context) => {
    try {
        if (!context.user) throw new Error("User not authenticated.");
        
        const user = await User.findById(context.user.id);
        if (!user) throw new Error("User not found.");
        if (!bets || bets.length === 0) throw new Error("No bets placed.");

        // Get spin result
        const spinResultString = getRandomRouletteResult();
        console.log("🎰 Spin Result:", spinResultString);

        // Process bets
        const { totalBetAmount, totalWinnings, betResults } = processBets(bets, spinResultString, user);

        // Update user balance
        user.balance -= totalBetAmount;
        user.balance += totalWinnings;
        await user.save();

        console.log("💰 Updated Balance:", user.balance);
        
        return {
            spinResult: spinResultString,
            balance: user.balance,
            betResults
        };
    } catch (error) {
        console.error("❌ Error in placeBet:", error.message);
        throw new Error("Bet placement failed.");
    }
};

module.exports = { placeBet };
