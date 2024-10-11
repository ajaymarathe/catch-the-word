import React, { useState, useEffect } from "react";
import "../styles/TypingGame.css";

const TypingGame = () => {
  const [words, setWords] = useState([
    { word: "react", top: 0, left: Math.random() * 80 },
    { word: "javascript", top: 0, left: Math.random() * 80 },
    { word: "coding", top: 0, left: Math.random() * 80 },
  ]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          top: word.top + 5,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
    const matchedWord = words.find((w) => w.word === e.target.value);
    if (matchedWord) {
      setWords(words.filter((w) => w.word !== matchedWord.word));
      setScore(score + 1);
      setInput("");
    }
  };

  return (
    <div>
      <h1>Typing Word Game</h1>
      <div className="game-container">
        {words.map((w, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${w.top}px`,
              left: `${w.left}%`,
              transition: "top 0.1s linear",
            }}
            className="falling-word"
          >
            {w.word}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type the word here..."
      />
      <h2>Score: {score}</h2>
    </div>
  );
};

export default TypingGame;
