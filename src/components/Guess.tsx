import { useState, useRef, ChangeEventHandler, KeyboardEventHandler } from "react";
import { HangmanGuessResult } from "../model/HangmanGuess";

type GuessProps = {
  onGuess: (guessedLetter: string) => void
}

export const Guess = (props: GuessProps): JSX.Element => {
  const [value, setValue] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const onGuessChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const curr = event.currentTarget.value;
    if (curr) {
      const l = curr.split("").pop();
      if (l) {
        setValue(l);
      }
    } else {
      setValue("");
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      if (value && value !== "") {
        props.onGuess(value);
      }

      setValue("");

      if (inputEl.current !== null) {
        inputEl.current.focus();
      }
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

type GuessesProps = {
  guesses: Array<HangmanGuessResult>,
  attempts: number
}

export const Guesses = (props: GuessesProps): JSX.Element => {
  return (
    <div className="section" style={{ width: "30%", overflow: 'auto' }}>
      <h3>Attempts:</h3>
      <Attempts attempts={props.attempts} />
      {props.guesses.map((guess, index) => {
        return (
          <h3 className={guess.isCorrect ? "correct" : "incorrect"} key={index}>
            {index + 1}: {guess.character.toUpperCase()} is a{" "}
            {guess.isCorrect ? "HIT" : "MISS"}
          </h3>
        );
      })}
    </div>
  );
};

type AttemptProps = {
  attempts: number
}

export const Attempts = (props: AttemptProps): JSX.Element => {
  return <h5 style={{ margin: 0 }}>Remaining: {props.attempts}</h5>;
};
