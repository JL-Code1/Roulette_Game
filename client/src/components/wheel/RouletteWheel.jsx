import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";

// GraphQL Mutation to place bets
const PLACE_BET = gql`
    mutation PlaceBet($bets: [BetInput!]!) {
        placeBet(bets: $bets) {
            spinResult
            balance
        }
    }
`;

// American Roulette numbers order
const numbers = ["00", "28", "9", "26", "30", "11", "7", "20", "32", "17", "5", "22",
                 "34", "15", "3", "24", "36", "13", "1", "0", "27", "10", "25", "29",
                 "12", "8", "19", "31", "18", "6", "21", "33", "16", "4", "23", "35",
                 "14", "2"];

// Number colors
const numberColors = {
    "00": "green", "0": "green",
    "1": "red", "2": "black", "3": "red", "4": "black", "5": "red", "6": "black",
    "7": "red", "8": "black", "9": "red", "10": "black", "11": "black", "12": "red",
    "13": "black", "14": "red", "15": "black", "16": "red", "17": "black", "18": "red",
    "19": "red", "20": "black", "21": "red", "22": "black", "23": "red", "24": "black",
    "25": "red", "26": "black", "27": "red", "28": "black", "29": "black", "30": "red",
    "31": "black", "32": "red", "33": "black", "34": "red", "35": "black", "36": "red"
};

const getColor = (num) => numberColors[num] || "black";
const sectionSize = 360 / numbers.length;

const RouletteWheel = ({ bets, setBalance }) => {
    const [angle, setAngle] = useState(0);
    const [ballAngle, setBallAngle] = useState(0);
    const [winningNumber, setWinningNumber] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const [placeBet] = useMutation(PLACE_BET);

    useEffect(() => {
        if (winningNumber !== null) {
            const winningIndex = numbers.indexOf(winningNumber);
            if (winningIndex !== -1) {
                const spinOffset = 360 * 3; // Ensures multiple full spins before stopping
                const targetAngle = spinOffset + (winningIndex * sectionSize);

                setAngle(-targetAngle);
                setBallAngle(-targetAngle * 1.2); // Ball spins slightly longer
            }
        }
    }, [winningNumber]);

    const spinWheel = async () => {
        if (isSpinning) return;
        if (!bets || bets.length === 0) {
            setWinningNumber("⚠️ Please place a bet first!");
            return;
        }

        setIsSpinning(true);
        setWinningNumber("🔄 Spinning...");

        try {
            const { data } = await placeBet({
                variables: { bets },
                context: { headers: { authorization: `Bearer ${localStorage.getItem("token") || ""}` } }
            });

            const backendWinningNumber = data.placeBet.spinResult;
            if (!backendWinningNumber) throw new Error("Failed to retrieve spin result.");

            setWinningNumber(backendWinningNumber);
            setBalance(data.placeBet.balance); // ✅ Update balance in the frontend
        } catch (error) {
            console.error("Error placing bet:", error.message);
            setWinningNumber("❌ Error fetching spin result.");
        } finally {
            setIsSpinning(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h2>{winningNumber ? `🎯 Winning Number: ${winningNumber}` : "Place Your Bets!"}</h2>

            <div style={{ position: "relative" }}>
                <div
                    style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        border: "5px solid black",
                        background: `conic-gradient(${numbers.map((num, index) => `${getColor(num)} ${index * sectionSize}deg ${(index + 1) * sectionSize}deg`).join(", ")})`,
                        transform: `rotate(${angle}deg)`,
                        transition: "transform 3s ease-out",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Ball animation */}
                    <div
                        style={{
                            position: "absolute",
                            width: "15px",
                            height: "15px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            transform: `rotate(${ballAngle}deg) translateY(-120px)`,
                            transition: "transform 3s ease-out",
                        }}
                    />

                    {/* Number labels */}
                    {numbers.map((num, index) => {
                        const angle = index * sectionSize + sectionSize / 2;
                        return (
                            <div
                                key={num}
                                style={{
                                    position: "absolute",
                                    transform: `rotate(${angle}deg) translateY(-137px) rotate(180deg)`,
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: "center",
                                    width: "20px",
                                    padding: "2px"
                                }}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button onClick={spinWheel} disabled={isSpinning}>
                {isSpinning ? "Spinning..." : "Spin"}
            </button>
        </div>
    );
};

RouletteWheel.propTypes = {
    bets: PropTypes.array.isRequired,
    setBalance: PropTypes.func.isRequired,
};

export default RouletteWheel;
