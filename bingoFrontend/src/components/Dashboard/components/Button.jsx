// Button.jsx
import React from "react";

const Button = ({ number, isMarked, isMatched, onClick }) => {
  return (
    <button
      type="button"
      className={`btn ${
        isMatched ? "bg-green-500" : isMarked ? "bg-green-500" : "bg-gray-500"
      } text-white px-4 py-2 rounded-md mr-2 mb-2`}
      onClick={onClick}
    >
      {number < 10 ? `0${number}` : number}
    </button>
  );
};

export default Button;
