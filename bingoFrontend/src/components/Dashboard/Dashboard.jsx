import React, { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import RandomNumber from "./components/RandomNumber";
import axios from "axios";

function Dashboard() {
  const [randomInt, setRandomInt] = useState(0);
  const [randomGameCode, setRandomGameCode] = useState("");
  const [markedNumbers, setMarkedNumbers] = useState({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });

  const letters = ["B", "I", "N", "G", "O"];
  const ranges = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleNextBallClick = async (e) => {
    const randomNumber = getRandomInt(1, 75);
    setRandomInt(randomNumber);
    const letter = getLetterForNumber(randomNumber);
    if (!markedNumbers[letter].includes(randomNumber)) {
      handleButtonClick(letter, randomNumber);
    }
    try {
      await addNumber(e); // Assuming no parameters are needed for addNumber
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonClick = (letter, number) => {
    const updatedMarkedNumbers = { ...markedNumbers };
    updatedMarkedNumbers[letter] = [...updatedMarkedNumbers[letter], number];
    setMarkedNumbers(updatedMarkedNumbers);
  };

  const getLetterForNumber = (number) => {
    for (let i = 0; i < ranges.length; i++) {
      if (number >= ranges[i][0] && number <= ranges[i][1]) {
        return letters[i];
      }
    }
    return null;
  };

  const createNewGame = async (e) => {
    e.preventDefault();
    console.log("Na click siya");
    // Reset marked numbers to default color (empty arrays)
    setMarkedNumbers({
      B: [],
      I: [],
      N: [],
      G: [],
      O: [],
    });

    try {
      // Generate a random game code
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const gameCodeLength = 8;
      let randomGameCode = "";
      for (let i = 0; i < gameCodeLength; i++) {
        randomGameCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      setRandomGameCode(randomGameCode); // Set the random game code in the state

      // Prepare game letter requests
      const gameLetterRequests = letters.map((letter) => ({
        gameLetter: letter,
        gameNumbers: [],
      }));

      // Send the axios post request
      const response = await axios.post(
        "http://localhost:8080/api/bingo/dashboard/newGame",
        {
          gameCode: randomGameCode,
          gameLetterRequests: gameLetterRequests,
        }
      );

      // Handle the response if needed
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNumber = async (e) => {
    e.preventDefault();
    const letter = getLetterForNumber(randomInt);
    console.log("goods");
    console.log("letter:", letter);
    console.log("number", randomInt);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bingo/dashboard/addNewNumber",
        {
          gameCode: randomGameCode,
          gameLetter: letter,
          newNumber: randomInt,
        }
      );
      console.log("Response:", response.data); // Log response data for debugging
    } catch (error) {}
  };

  return (
    <div className="Main">
      <button
        className="btn-CreateGame mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none"
        onClick={createNewGame}
      >
        Create New Game
      </button>
      <div className="Cardborder-2 border-gray-300 rounded-lg flex-col items-center">
        <RandomNumber randomInt={randomInt} />
        <h1 className="text-xl font-bold mb-4 mt-4">
          Game Code: {randomGameCode}
        </h1>
        {letters.map((letter, index) => (
          <Card
            key={letter}
            letter={letter}
            numbers={Array.from(
              { length: ranges[index][1] - ranges[index][0] + 1 },
              (_, i) => i + ranges[index][0]
            )}
            markedNumbers={markedNumbers}
            randomInt={randomInt}
            handleButtonClick={handleButtonClick}
          />
        ))}
      </div>
      <button
        className="btn-NextBall mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md focus:outline-none"
        onClick={(e) => handleNextBallClick(e)}
      >
        Next Ball
      </button>
    </div>
  );
}

export default Dashboard;
