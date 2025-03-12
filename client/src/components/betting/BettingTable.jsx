import "../../styles/BettingTable.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// BettingTable Component
const BettingTable = ({ onBet, onSpin, resetBets }) => {
    const numberGrid = [
        ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"],
        ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"],
        ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"],
    ];

    const specialBets = [
        { type: "highLow", value: "1-18" },
        { type: "oddEven", value: "Even" },
        { type: "color", value: "Red" },
        { type: "color", value: "Black" },
        { type: "oddEven", value: "Odd" },
        { type: "highLow", value: "19-36" }
    ];

    // State for placed bets and chip value
    const [bets, setBets] = useState({});
    const [betAmount, setBetAmount] = useState(10); // Default chip value

    // Reset bets when requested by parent (Roulette.jsx)
    useEffect(() => {
        if (resetBets) {
            setBets({});
        }
    }, [resetBets]);

    // Function to add a bet (stack chips)
    const placeBet = (betType, betValue) => {
        setBets(prevBets => {
            const key = `${betType}-${betValue}`;
            return {
                ...prevBets,
                [key]: (prevBets[key] || 0) + betAmount > 0 ? (prevBets[key] || 0) + betAmount : betAmount, // Ensures valid bet values
            };
        });
    };
    

    // Function to remove last chip from a bet (right-click)
    const removeBet = (betType, betValue, event) => {
        event.preventDefault(); // Prevent default right-click menu
        setBets(prevBets => {
            const key = `${betType}-${betValue}`;
            if (!prevBets[key]) return prevBets; // If no bet exists, do nothing
            const newBets = { ...prevBets };
            newBets[key] -= betAmount;
            if (newBets[key] <= 0) delete newBets[key]; // Remove bet if amount is 0
            return newBets;
        });
    };

    // Function to send bets to backend when spinning
    const handleSpin = () => {
        console.log("Bets before spin:", bets);
        if (Object.keys(bets).length === 0) {
            alert("⚠️ No bets placed!");
            return;
        }

        const formattedBets = Object.entries(bets).map(([key, amount]) => {
            const [betType, betValue] = key.split("-");
            return { amount, betType, betValue };
        });

        onBet(formattedBets); // Send bets to parent (Roulette.jsx)
        onSpin(); // Trigger spin
        setBets([]); // Reset bets after spin FINALLY!!
    };

    return (
        <div className="betting-table">
            <h3>Select Chip:</h3>
            <div className="chip-selector">
                {[1, 5, 10, 25, 50, 100].map(amount => (
                    <button
                        key={amount}
                        className={`chip ${betAmount === amount ? "selected-chip" : ""}`}
                        onClick={() => setBetAmount(amount)}
                    >
                        ${amount}
                    </button>
                ))}
            </div>

            <div className="grid-container">
                <div className="zero-column">
                    {["00", "0"].map(value => (
                        <div
                            key={value}
                            className="bet-cell green-cell"
                            onClick={() => placeBet("number", value)}
                            onContextMenu={(e) => removeBet("number", value, e)}
                        >
                            {value}
                            {bets[`number-${value}`] && <div className="chip-on-bet">${bets[`number-${value}`]}</div>}
                        </div>
                    ))}
                </div>

                {/* Number Grid */}
                <div className="number-grid">
                    {numberGrid.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map(num => (
                                <div
                                    key={num}
                                    className={`bet-cell ${["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"].includes(num) ? "red-cell" : "black-cell"} ${bets[`number-${num}`] ? "bet-active" : ""}`}
                                    onClick={() => placeBet("number", num)}
                                    onContextMenu={(e) => removeBet("number", num, e)}
                                >
                                    {num}
                                    {bets[`number-${num}`] && <div className="chip-on-bet">${bets[`number-${num}`]}</div>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Special Bets */}
            <div className="special-bets">
            {specialBets.map(({ type, value }) => (
                <div
                    key={value}
                    className={`bet-cell ${value === "Red" ? "red-cell" : value === "Black" ? "black-cell" : ""} 
                                ${bets[`${type}-${value}`] ? "bet-active" : ""}`} // ✅ Ensuring bet-active applies correctly
                    onClick={() => placeBet(type, value)}
                    onContextMenu={(e) => removeBet(type, value, e)}
                >
                    {value}
                    {bets[`${type}-${value}`] && <div className="chip-on-bet">${bets[`${type}-${value}`]}</div>}
                </div>
            ))}

            </div>

            <button className="spin-btn" onClick={handleSpin}>
                Spin
            </button>    
        </div>
    );
};

BettingTable.propTypes = {
    onBet: PropTypes.func.isRequired,
    onSpin: PropTypes.func.isRequired,
    resetBets: PropTypes.bool, // Reset state when this prop changes
};

export default BettingTable;
