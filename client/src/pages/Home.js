import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Roulette</h1>
      <Link to="/game">
        <button>Play Now</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;