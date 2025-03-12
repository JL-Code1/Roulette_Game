const { betTypes, betPayouts } = require("../data/index");

const processBets = (bets, spinResultString, user) => {
    console.log("Processing bets...");
    const allowedBetAmounts = [1, 5, 10, 20, 25, 50, 100];
    let totalBetAmount = 0;
    let totalWinnings = 0;
    let betResults = [];

    for (const bet of bets) {
        let { amount, betType, betValue } = bet;
        console.log(`Processing bet: ${betType} ${betValue} $${amount}`);

        // Convert to lowercase early for consistency
        const normalizedBetType = betType.toLowerCase();
        const normalizedBetValue = betValue.toLowerCase();

        // Validate bet amount
        if (!allowedBetAmounts.includes(amount)) {
            console.log("Invalid bet amount.");
            betResults.push({ betType, betValue, message: "Invalid bet amount.", winnings: 0 });
            continue;
        }

        // Check if user has enough balance BEFORE adding to totalBetAmount
        if (user.balance < amount) {
            console.log("Insufficient balance.");
            betResults.push({ betType, betValue, message: "Insufficient balance.", winnings: 0 });
            continue;
        }

        totalBetAmount += amount; // Only add valid bets

        // Validate bet type and value
        if (!betTypes[normalizedBetType] || !betTypes[normalizedBetType][normalizedBetValue]) {
            console.log("Invalid bet type or value.");
            betResults.push({ betType, betValue, message: "Invalid bet type or value.", winnings: 0 });
            continue;
        }

        let betWon = false;
        let payoutMultiplier = betPayouts[normalizedBetType] || 1;

        if (normalizedBetType === "number") {
            betWon = betTypes.number.includes(normalizedBetValue) && spinResultString === normalizedBetValue;
        } else {
            betWon = betTypes[normalizedBetType][normalizedBetValue]?.includes(spinResultString) || false;
        }

        let winnings = betWon ? amount * (payoutMultiplier - 1) + amount : 0;
        if (betWon) {
            console.log(`✅ Bet won! Payout: $${winnings}`);
        } else {
            console.log("❌ Bet lost.");
        }

        totalWinnings += winnings;
        betResults.push({
            betType: normalizedBetType,
            betValue: normalizedBetValue,
            message: betWon ? `You won! ${betValue} matched ${spinResultString}.` : `You lost. ${betValue} did not match ${spinResultString}.`,
            winnings
        });
    }

    console.log(`Total Bet Amount: $${totalBetAmount}, Total Winnings: $${totalWinnings}`);
    return { totalBetAmount, totalWinnings, betResults };
};

module.exports = processBets;
