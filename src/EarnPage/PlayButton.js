import React from "react";

const PlayButton = ({ startGame }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <button
        onClick={startGame}
        style={{
          fontSize: "24px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Play Game
      </button>
    </div>
  );
};

export default PlayButton;
