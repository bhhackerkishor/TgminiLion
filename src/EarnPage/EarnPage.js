import './game1.css';
import React, { useState } from "react";
import CatchFire from "./CatchFire"; // Import the Game component
import PlayButton from "./PlayButton"; // Import the Play button component

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true); // Start the game when the button is clicked
  };

  return (
    <>
    
    <div className="catchgame">

      {!isGameStarted ? (
        
        <>
        <h1>Play Game</h1>
        

        <PlayButton startGame={startGame} />
        </> // Show the Play button if the game has not started
      ) : (
        <CatchFire /> // Show the game once it has started
      )}
    </div>
    </>
  );
};

export default App;