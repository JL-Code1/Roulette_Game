import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import BettingTable from "../components/betting/BettingTable";
import RouletteWheel from "../components/wheel/RouletteWheel";

// GraphQL Mutation to place bets
const PLACE_BET = gql`
    mutation PlaceBet($bets: [BetInput!]!) {
        placeBet(bets: $bets) {
            spinResult
            balance
            betResults {
                betType
                betValue
                message
                winnings
            }
        }
    }
`;

const Roulette = () => {
    const [bets, setBets] = useState([]); 
    const [winningNumber, setWinningNumber] = useState(null);
    const [balance, setBalance] = useState(null);
    const [placeBet] = useMutation(PLACE_BET);

    useEffect(() => {
        if (winningNumber !== null) {
            console.log("🎯 Winning Number Updated:", winningNumber);
        }
    }, [winningNumber]);

    useEffect(() => {
        if (balance !== null) {
            console.log("💰 Current Balance Updated:", balance);
        }
    }, [balance]);

    const handleBet = (newBets) => {
        setBets(newBets);
    };

    const handleSpin = async () => {
        if (bets.length === 0) {
            alert("No bets placed!");
            return;
        }

        try {
            const { data } = await placeBet({
                variables: { bets },
                context: { headers: { authorization: `Bearer ${localStorage.getItem("token") || ""}` } }
            });

            if (data?.placeBet) {
                setWinningNumber(data.placeBet.spinResult);
                setBalance(data.placeBet.balance);
            }
        } catch (error) {
            console.error("❌ Error placing bet:", error.message); // CURRENT PROBLEM
        }
        
    };

    return (
        <div className="roulette-container">
            <RouletteWheel winningNumber={winningNumber} />
            <BettingTable onBet={handleBet} onSpin={handleSpin} />
            <h3>💰 Current Balance: ${balance !== null ? balance : "Loading..."}</h3>
        </div>
    );
};

export default Roulette;
