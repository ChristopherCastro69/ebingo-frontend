import React from "react";
import axios from "axios";

const PlaycardTokens = ({ setNewToken }) => {
  const fetchRandomToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bingo/playcardTokens"
      );
      const playcardTokens = response.data;

      if (playcardTokens.length > 0) {
        const randomIndex = Math.floor(Math.random() * playcardTokens.length);
        setNewToken(playcardTokens[randomIndex]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={fetchRandomToken}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none mt-2"
    >
      Get Random Playcard Token
    </button>
  );
};

export default PlaycardTokens;
