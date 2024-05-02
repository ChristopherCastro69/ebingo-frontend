import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BingoCard from "./components/BingoCard/BingoCard";
import GameCode from "./components/GameCode";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route exact path="/findRoute" element={<FindRoute />} /> */}
          <Route exact path="/" element={<GameCode />} />
          <Route exact path="/getBingoCard/:gameCode" element={<BingoCard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
