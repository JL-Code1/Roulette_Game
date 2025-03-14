import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Roulette from "./pages/Roulette";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  // Update authentication state when the token changes
  //useEffect(() => {
    //const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    //window.addEventListener("storage", checkAuth);
    //return () => window.removeEventListener("storage", checkAuth);
  //}, []);

  // is not needed due to it doing the auth in main ^

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/roulette" 
            element={isAuthenticated ? <Roulette /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
  );
}

export default App;
