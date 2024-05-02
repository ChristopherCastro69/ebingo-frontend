import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BingoCard from "./BingoCard/BingoCard";

const GameCode = (props) => {
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setGameCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission

    navigate(`/getBingoCard/${gameCode}`);
  };

  return (
    <div>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold" htmlFor="gameCode">
          Input Game Code
        </label>
        <input
          id="gameCode"
          value={gameCode}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter game code..."
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default GameCode;
