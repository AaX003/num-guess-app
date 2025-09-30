import { useState } from "react";

import "./App.css";

function GuessNumber() {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [guesses, setGuesses] = useState(0);
  const [won, setWon] = useState(false);
  
  const [randValue, setRandValue] = useState(() => Math.floor(Math.random() * 10));

  const maxGuesses = 5;
  const isOver = won || guesses >= maxGuesses;

  const guessNumber = () => {
    if (isOver) return;

    setMsg("");
    setErr("");

    const val = input.trim();
    if (val === "") {
      setErr("Enter a number.");
      return;
    }

    const guess = Number(val);
    const attempts = guesses + 1;

    if (!Number.isInteger(guess)) {
      setErr("Guess must be a digit.");
      return;
    }

    if (guess < 0 || guess > 9) {
      setErr("Guess must be between 0-9.");
      return;
    }

    if (guess === randValue) {
      setMsg(`Yes! You guessed correctly!\nYou guessed in ${attempts} attempt(s).`);
      setWon(true);
    } else if (guess > randValue) {
      setErr("Your guess is too high.");
    } else {
      setErr("Your guess is too low.");
    }

    setGuesses(attempts);

    if (attempts >= maxGuesses && guess !== randValue) {
      setErr(`Guess limit reached. The correct number was: ${randValue}.`);
    }
  };

  const resetGame = () => {
    setInput("");
    setMsg("");
    setErr("");
    setGuesses(0);
    setWon(false);
    setRandValue(Math.floor(Math.random() * 10));
  }

  return (
    <div className="container">
      <header className="header">
        <h2 className="title">Guess Number</h2>
        <p className="subtitle">
          I am thinking of a number between 0-9<br />
          Can you guess it?
        </p>
        <small className="stats">
          Attempts: {guesses} / {maxGuesses}
        </small>
      </header>

      <section className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={won}
        />
        <button className="check-btn" onClick={isOver ? resetGame : guessNumber} disabled={input.length === 0 && !isOver}>
          {isOver ? "Reset" : "Check"}
        </button>
      </section>

      <section className="output-container">
        {msg && !err && <small className="msg" 
        style={{ background: "#61ee45b0", color: "green", padding: "0.5rem", borderRadius: "5px"}}>{msg}</small>}
        {err && !msg && <small className="err-msg" 
        style={{ background: "#d5333374", color: "red", padding: "0.5rem", borderRadius: "5px"}}>
          {err}
        </small>}
      </section>
    </div>
  );
}

export default GuessNumber;
