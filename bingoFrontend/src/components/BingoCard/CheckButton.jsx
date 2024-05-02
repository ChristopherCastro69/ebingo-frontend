import React from "react";
import axios from "axios";

const CheckButton = ({ playcardToken, gameCode }) => {
  // Function to handle the click event of the button
  const handleCheckBingo = async (e) => {
    // Logic to check bingo using playcardToken and gameCode
    console.log("Checking bingo for playcardToken:", playcardToken);
    console.log("Game Code:", gameCode);
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/api/bingo/checkBingo/${playcardToken}/bCode=${gameCode}`
      );

      console.log("Response:", response.data); // Log response data for debugging

      if (response.data === 1) {
        alert("Bingo!");
      } else if (response.data === 0) {
        alert("No Bingo");
      } else {
        alert("Invalid ID");
      }
    } catch (error) {
      console.error("Error:", error); // Use console.error for errors
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md focus:outline-none mt-10"
      onClick={handleCheckBingo}
    >
      Check Bingo
    </button>
  );
};

export default CheckButton;
