import React, { useState, useEffect } from "react";

const Game = () => {
  const [fires, setFires] = useState(generateFires(5)); // Generate 5 fires initially
  const [padPosition, setPadPosition] = useState(50); // Position of the collector
  const [dragging, setDragging] = useState(false); // State to track dragging
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Set interval for the falling fire (speed doubled), but only if the game is not over
    const intervalId = setInterval(() => {
      if (!isGameOver) {
        setFires((prevFires) => {
          return prevFires.map((fire) => {
            if (fire.y >= 100) {
              // If fire reaches the bottom, reset it
              return { x: Math.random() * 100, y: 0 };
            }
            return { ...fire, y: fire.y + 2 }; // Move each fire down twice as fast
          });
        });
      }
    }, 50); // Interval time reduced to make the fire fall faster

    // Set interval for the game timer, but stop when it reaches 0
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          setIsGameOver(true); // Set game over flag
          clearInterval(timerId); // Stop the timer
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, [isGameOver]);

  // Detect collisions
  useEffect(() => {
    if (!isGameOver) {
      setFires((prevFires) =>
        prevFires.map((fire) => {
          if (fire.y >= 90 && fire.x > padPosition - 10 && fire.x < padPosition + 10) {
            setScore((score) => score + 1); // Increase score
            return { x: Math.random() * 100, y: 0 }; // Reset fire position
          }
          return fire;
        })
      );
    }
  }, [fires, padPosition, isGameOver]);

  // Generate initial fires
  function generateFires(num) {
    let firesArray = [];
    for (let i = 0; i < num; i++) {
      firesArray.push({ x: Math.random() * 100, y: Math.random() * 50 });
    }
    return firesArray;
  }

  // Handle mouse down (start dragging)
  const handleMouseDown = () => {
    setDragging(true);
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle mouse move (update position when dragging)
  const handleMouseMove = (e) => {
    if (dragging && !isGameOver) {
      setPadPosition((e.clientX / window.innerWidth) * 100);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ height: "100vh",width:"auto", position: "relative", backgroundColor: "black",bottom:"83px" }}
    >
      {fires.map((fire, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${fire.y}%`,
            left: `${fire.x}%`,
            fontSize: "30px",
            userSelect:"none"
          }}
        >
          🍎
        </div>
      ))}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          bottom: "0",
          left: `${padPosition}%`,
          width: "100px",
          height: "20px",
          backgroundColor: "blue",
          cursor: "pointer",
          userSelect:"none"
        }}
      >collector</div>
      <div style={{ position: "absolute", top: 83, left: 0, color: "white" }}>Time Left: {timeLeft}s</div>
      <div style={{ position: "absolute", top: 83, right: 0, color: "white" }}>Score: {score}</div>
      {isGameOver && <div style={{ position: "absolute", top: "50%", left: "50%", color: "white" }}>Game Over</div>}
    </div>
  );
};

export default Game;