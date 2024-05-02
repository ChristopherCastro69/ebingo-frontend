// RandomNumber.jsx
import React from "react";

const RandomNumber = ({ randomInt }) => {
  return (
    <div className="RandInt absolute top-4 right-4 text-2xl font-bold">
      {randomInt}
    </div>
  );
};

export default RandomNumber;
