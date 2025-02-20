import { useState } from "react";

const RouletteWheel = () => {
    const [angle, setAngle] = useState(0); // Track wheel angle
    const [ballAngle, setBallAngle] = useState(0); // Track ball angle
    const [winningNumber, setWinningNumber] = useState(null); // Track winning number
    const [isSpinning, setIsSpinning] = useState(false); // Track if wheel is spinning

    // American Roulette order of numbers
    const numbers = [
        "00", "28", "9", "26", "30", "11", "7", "20", "32", "17", "5", "22",
        "34", "15", "3", "24", "36", "13", "1", "0", "27", "10", "25", "29",
        "12", "8", "19", "31", "18", "6", "21", "33", "16", "4", "23", "35",
        "14", "2"
    ];

    // Color mapping for numbers   
    const numberColors = {
        "00": "green", "0": "green",
        "1": "red", "2": "black", "3": "red", "4": "black", "5": "red", "6": "black",
        "7": "red", "8": "black", "9": "red", "10": "black", "11": "black", "12": "red",
        "13": "black", "14": "red", "15": "black", "16": "red", "17": "black", "18": "red",
        "19": "red", "20": "black", "21": "red", "22": "black", "23": "red", "24": "black",
        "25": "red", "26": "black", "27": "red", "28": "black", "29": "black", "30": "red",
        "31": "black", "32": "red", "33": "black", "34": "red", "35": "black", "36": "red"
    };
    
    // Assign colors based on actual number, not index
    const getColor = (num) => numberColors[num] || "black";

    const sectionSize = 360 / numbers.length; // Each section's exact size (9.47)

    const wheelBackground = `conic-gradient(
        ${numbers
            .map((num, index) => `${getColor(num)} ${(index * sectionSize)}deg ${(index + 1) * sectionSize}deg`)
            .join(", ")}
    )`;

    const spinWheel = () => {
        if (isSpinning) return; // Prevent extra clicks while spinning
    
        setIsSpinning(true); // Disable button while spinning
        setWinningNumber("Spin in Progress...");
    
        const randomSpin = 360 * 3 + Math.floor(Math.random() * 360); // Randomized spin
        
        // Counterclockwise wheel spin
        const newWheelAngle = angle - randomSpin; 
        
        // Find the nearest section center for the ball
        const rawBallAngle = ballAngle + randomSpin * 2; // Ball spins twice as fast
        const sectionSize = 360 / numbers.length; // Each section's exact size (9.47)
    
        // Snap ball to the closest section center
        const snappedBallAngle = Math.round(rawBallAngle / sectionSize) * (sectionSize) + (sectionSize / 2);
        
        setAngle(newWheelAngle);
        setBallAngle(snappedBallAngle);
    
        // Delay setting the winning number until animation completes
        setTimeout(() => {
            const winningIndex = Math.floor((snappedBallAngle % 360) / sectionSize) % numbers.length;
            const winningNum = numbers[winningIndex];
    
            // Determine color of winning number
            let colorLabel = "";
            if (winningNum !== "00" && winningNum !== "0") {
                colorLabel = getColor(winningNum) === "red" ? "RED / " : "BLACK / ";
            }
            
            let oddEvenLabel = "";
            if (winningNum !== "00" && winningNum !== "0") {
                oddEvenLabel = winningNum % 2 === 0 ? "EVEN" : "ODD";
            }
            const displayWinningNumber = winningNum + " /" + //TODO Does not work with 0 or 00
            (colorLabel ? ` ${colorLabel}` : "") +
            (oddEvenLabel ? ` ${oddEvenLabel}` : "");

            setWinningNumber(displayWinningNumber); // Update winning number
            setIsSpinning(false); // Re-enable spin button AFTER the animation
        }, 3000);
    };
    

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            
            {/* Display Winning Number OR Spin Message */}
            <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
                {winningNumber === "Spin in Progress..." ? "Spin in Progress..." : 
                    winningNumber !== null ? `Winning Number: ${winningNumber}` : "Place Your Bets!"}
            </h2>

            <div style={{ position: "relative" }}>
                {/* Roulette Wheel */}
                <div
                    style={{
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        border: "5px solid black",
                        background: wheelBackground, 
                        transform: `rotate(${angle}deg)`,
                        transition: "transform 3s ease-out",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Ball */}
                    <div
                        style={{
                            position: "absolute",
                            width: "15px",
                            height: "15px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            transform: `rotate(${ballAngle}deg) translateY(-120px)`, // Distance from center
                            transition: "transform 3s ease-out",
                        }}
                    />
                    
                    {/* Numbers for wheel */}
                    {numbers.map((num, index) => {
                        const angle = (index * sectionSize) + (sectionSize / 2); // Angle for each number, centered at half a section

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
            
            {/* Spin Button */}
            <button 
                onClick={!isSpinning ? spinWheel : null} 
                disabled={isSpinning} // Button disabled while spinning
                style={{ 
                    marginTop: "20px", 
                    padding: "10px 20px", 
                    fontSize: "18px", 
                    cursor: isSpinning ? "not-allowed" : "pointer",
                    opacity: isSpinning ? 0.5 : 1 
                }}
            >
                {isSpinning ? "Spinning..." : "Spin"}
            </button>

        </div>
    );
};

export default RouletteWheel;
