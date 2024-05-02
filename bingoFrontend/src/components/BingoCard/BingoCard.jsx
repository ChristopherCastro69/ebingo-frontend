import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PlaycardTokens from "./playcardTokens";
import CardData from "./CardData";
import CheckButton from "./CheckButton";

const BingoCard = () => {
  // Use the gameCode value as needed
  const { gameCode } = useParams(); // Retrieve gameCode from URL parameters
  const [playcardToken, setPlayCardToken] = useState("");
  const [newToken, setNewToken] = useState("");
  const [bingoData, setBingoData] = useState(null);

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

  useEffect(() => {
    fetchRandomToken();
  }, []);

  const NewCardClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/api/bingo/getCard/${newToken}`
      );
      setBingoData(response.data);
      console.log(`${newToken}`);
      console.log("Response:", response.data); // Log response data for debugging
      fetchRandomToken(); // Fetch a new random token after clicking "New Card"
      //   alert(response.data);
    } catch (error) {
      console.error("Error:", error); // Use console.error for errors
    }
  };

  return (
    <div>
      <h2>Game Code: {gameCode}</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none mt-2"
        onClick={NewCardClick}
      >
        New Card
      </button>
      <p className="mt-3">Playcard Token: {newToken}</p>
      {bingoData && <CardData bingoData={bingoData} />}{" "}
      {/* Pass bingoData to CardData component if available */}
      <CheckButton playcardToken={newToken} gameCode={gameCode} />
    </div>
  );
};

export default BingoCard;
