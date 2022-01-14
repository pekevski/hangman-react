import { useState, useRef } from "react";

export const Guess = (props) => {
  const [value, setValue] = useState("");
  const inputEl = useRef(null);

  const onGuessChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setValue(event.target.value.split("").pop());
    } else {
      setValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (value && value !== "") {
        props.onGuess(value);
      }
      setValue("");
      inputEl.current.focus();
    }
  };

  return (
    <div>
      <div className="horizontal">
        <h1 style={{ marginRight: "10px" }}>Guess:</h1>
        <input
          autoFocus
          className="letter-input"
          ref={inputEl}
          value={value}
          onChange={onGuessChange}
          onKeyDown={handleKeyDown}
          maxLength={2}
        />
      </div>
      {value === "" ? (
        <p>Guess a letter by typing one.</p>
      ) : (
        <p>Press Enter to guess letter.</p>
      )}
    </div>
  );
};

export const Guesses = (props) => {
  return (
    <div className="section" style={{ width: "30%", overflow: 'auto' }}>
      <h3>Attempts:</h3>
      <Attempts attempts={props.attempts} />
      {props.guesses.map((guess, index) => {
        return (
          <h3 className={guess.correct ? "correct" : "incorrect"} key={index}>
            {index + 1}: {guess.guess.toUpperCase()} is a{" "}
            {guess.correct ? "HIT" : "MISS"}
          </h3>
        );
      })}
    </div>
  );
};

export const Attempts = (props) => {
  return <h5 style={{ margin: 0 }}>Remaining: {props.attempts}</h5>;
};
