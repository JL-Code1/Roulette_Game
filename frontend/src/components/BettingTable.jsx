import "../styles/BettingTable.css";
import PropTypes from "prop-types";

const BettingTable = ({ onBet }) => {
    const numberGrid = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["10", "11", "12"],
        ["13", "14", "15"],
        ["16", "17", "18"],
        ["19", "20", "21"],
        ["22", "23", "24"],
        ["25", "26", "27"],
        ["28", "29", "30"],
        ["31", "32", "33"],
        ["34", "35", "36"],
    ];

    return (
        <div className="betting-table">
            <div className="grid-container">
                <div className="zero-column"> {/* TODO Until a 0, 00 can fit in the Grid correctly */}
                    <div className="bet-cell green-cell" onClick={() => onBet("00")}>00</div>
                    <div className="bet-cell green-cell" onClick={() => onBet("0")}>0</div>
                </div>

                
                <div className="number-grid">
                    {numberGrid.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((num) => (
                                <div 
                                    key={num} //TODO need to change button design 
                                    className={`bet-cell ${["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"].includes(num) ? "red-cell" : "black-cell"}`}
                                    onClick={() => onBet(num)}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="special-bets">
                <div className="bet-cell" onClick={() => onBet("1-18")}>1-18</div>
                <div className="bet-cell" onClick={() => onBet("Even")}>EVEN</div>
                <div className="bet-cell black-cell" onClick={() => onBet("Black")}></div>
                <div className="bet-cell red-cell" onClick={() => onBet("Red")}></div>
                <div className="bet-cell" onClick={() => onBet("Odd")}>ODD</div>
                <div className="bet-cell" onClick={() => onBet("19-36")}>19-36</div>  
            </div>
        </div>
    );
};

BettingTable.propTypes = {  
    onBet: PropTypes.func.isRequired 
}; // TODO PropTypes for the BettingTable LATER

export default BettingTable;
