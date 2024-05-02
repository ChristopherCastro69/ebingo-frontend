import React from "react";

const CardData = ({ bingoData }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="grid">
        <div className="grid grid-cols-5 gap-4 border border-gray-400 p-4">
          {bingoData.bingoLetters.map((letterData) => (
            <div key={letterData.id} className="border border-gray-400 p-4">
              <h2 className="text-lg font-semibold">{letterData.letter}</h2>
              <ul className="list-disc ml-4 text-center mr-5">
                {letterData.numbers.map((number) => (
                  <ul key={number}>{number}</ul>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardData;
