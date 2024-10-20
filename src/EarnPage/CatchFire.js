import React, { useState, useEffect } from "react";

const Game = () => {
  const [items, setItems] = useState(generateItems(5)); // Generate 5 falling meat items initially
  const [lionPosition, setLionPosition] = useState(50); // Position of the lion
  const [dragging, setDragging] = useState(false); // State to track dragging
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Set interval for the falling items (speed doubled), but only if the game is not over
    const intervalId = setInterval(() => {
      if (!isGameOver) {
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.y >= 100) {
              // If item reaches the bottom, reset it
              return { x: Math.random() * 100, y: 0 };
            }
            return { ...item, y: item.y + 2 }; // Move each item down twice as fast
          });
        });
      }
    }, 50); // Interval time reduced to make the items fall faster

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
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.y >= 90 && item.x > lionPosition - 10 && item.x < lionPosition + 10) {
            setScore((score) => score + 1); // Increase score
            return { x: Math.random() * 100, y: 0 }; // Reset item position
          }
          return item;
        })
      );
    }
  }, [items, lionPosition, isGameOver]);

  // Generate initial falling items (meat)
  function generateItems(num) {
    let itemsArray = [];
    for (let i = 0; i < num; i++) {
      itemsArray.push({ x: Math.random() * 100, y: Math.random() * 50 });
    }
    return itemsArray;
  }

  // Handle mouse and touch down (start dragging)
  const handleStart = (e) => {
    setDragging(true);
    e.preventDefault(); // Prevent touch scrolling
  };

  // Handle mouse and touch up (stop dragging)
  const handleEnd = () => {
    setDragging(false);
  };

  // Handle mouse and touch move (update position when dragging)
  const handleMove = (e) => {
    if (dragging && !isGameOver) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setLionPosition((clientX / window.innerWidth) * 100);
    }
  };

  return (
    <div
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      style={{ height: "100vh", position: "relative", backgroundColor: "#282c34",backgroundImage, userSelect: "none" ,bottom:"86px"}} // Disable text selection
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${item.y}%`,
            left: `${item.x}%`,
            fontSize: "30px",
            userSelect: "none", // Disable selecting items
          }}
        >
          🍖
        </div>
      ))}
      <div
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{
          position: "absolute",
          bottom: "0",
          left: `${lionPosition}%`,
          width: "100px",
          height: "85px",
          backgroundColor: "transparent",
          cursor: "pointer",
          userSelect: "none", // Disable selecting the lion pad
          fontSize: "70px"
          ,
        }}
      >
        🦁
      </div>
      <div style={{ position: "absolute", top: 84, left: 0, color: "gold" ,fontFamily:"ariel",fontSize:"20px"}}>Time Left: {timeLeft}s</div>
      <div style={{ position: "absolute", top: 84, right: 0, color: "gold" ,fontFamily:"ariel",fontSize:"20px" }}>Score: {score}</div>
      {isGameOver && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "36px" }}>
          Game Over
        </div>
      )}
    </div>
  );
};

export default Game;
