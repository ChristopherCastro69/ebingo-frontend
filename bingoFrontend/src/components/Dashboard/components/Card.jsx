// Card.jsx
import React from "react";
import Button from "./Button";

const Card = ({
  letter,
  numbers,
  markedNumbers,
  randomInt,
  handleButtonClick,
}) => {
  return (
    <div className="container">
      <div className="button-container flex flex-wrap mb-4">
        <button
          type="button"
          className="btn btn-info bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2"
        >
          {letter}
        </button>
        {numbers.map((number) => (
          <Button
            key={`${letter}-${number}`}
            number={number}
            isMarked={markedNumbers[letter].includes(number)}
            isMatched={
              randomInt === number && markedNumbers[letter].includes(number)
            }
            onClick={() => handleButtonClick(letter, number)}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
