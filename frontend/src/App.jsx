import './styles/App.css'
import RouletteWheel from './components/RouletteWheel'
import BettingTable from './components/BettingTable' 

const App = () => { {/*change onBet */}
  const handleBet = (bet) => {
      console.log(`Bet placed on: ${bet}`);
  };

  return (
      <div style={{
          display: "flex",
          flexDirection: "row",  
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "50px"
      }}>
          <RouletteWheel />
          <BettingTable onBet={handleBet} /> {/*TODO onBet function */}
      </div>
  );
};

export default App;



