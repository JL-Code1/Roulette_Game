import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Roulette from "./pages/Roulette";
import client from "./apolloClient";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  // Update authentication state when the token changes
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/roulette" 
            element={isAuthenticated ? <Roulette /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
