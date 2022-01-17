import {
  useState,
  useRef,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import { HangmanGuessResult } from "../model/HangmanGuess";

type GuessProps = {
  onGuess: (guessedLetter: string) => void;
};

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
  guesses: Array<HangmanGuessResult>;
  attempts: number;
};

export const Guesses = (props: GuessesProps): JSX.Element => {
  return (
    <div className="section">
      <h3>Attempts Remaining: {props.attempts}</h3>
      <div className="horizontal">
      {props.guesses.map((guess, index) => {
        return (
          <h3 className={guess.isCorrect ? "correct" : "incorrect"} style={{marginRight: '1rem'}} key={index}>
            {guess.character.toUpperCase()} {guess.isCorrect ? "✅" : "❌"}
          </h3>
        );
      })}
      </div>
    </div>
  );
};