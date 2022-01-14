import { useState, useEffect } from "react";

import { Guesses, Guess } from "./Guess";
import { Letters } from "./Letter";

export const Hangman = () => {
  const [word, setWord] = useState(null);
  const [retry, setRetry] = useState(false);
  const [letters, setLetters] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(5);
  const [result, setResult] = useState(undefined);

  const handleRetry = () => {
    // triggers fetch a new word
    setLetters([]);
    setGuesses([]);
    setResult(undefined);
    setRetry(!retry);
  };

  const onGuessLetter = (guessedLetter) => {
    let guess = guessedLetter.toLowerCase();

    // console.log(`guess: ${guess}`);

    // when this is a new guess lets do something with it
    // otherwise we wont calculate it
    if (!guesses.some(g => g.guess === guess)) {
      const currentLetters = letters.slice();
      let correct = false;

      currentLetters.forEach((letter) => {
        if (letter.character === guess) {
          letter.isShown = true;
          correct = true;
        }
      });

      // if we have the guess in the map then its a correct guess
      if (correct) {
        setLetters(currentLetters);
      } else {
        // didnt make a correct guess so use up an attempt
        setAttempts(attempts - 1);

        // Add our guess to the list
      }
      
      setGuesses(guesses.concat({ guess, correct }));

      // Check for a winning / losing result
      checkResult();
    }
  };

  const checkResult = () => {
    const allShown = letters.every((l) => l.isShown);

    if (allShown) {
      setResult("WINNER! :)");
    } else if (attempts <= 1) {
      setResult("DEAD :(");
    }
  };

  useEffect(() => {
    console.log("useEffect WORD");

    async function getWord() {
      let word = "Hangman";
      try {
        const data = await fetch(
          "https://random-word-api.herokuapp.com/word?number=1"
        );
        const wordJSON = await data.json();
        word = wordJSON[0];
        console.log(word);
      } catch (err) {
        // noop
      }

      setWord(word);
      setAttempts(6);
    }

    // call our async function here
    getWord();
  }, [retry]);

  useEffect(() => {
    if (word) {
      console.log("useEffect LETTERS");
      const letterArray = word.split("").map((char) => {
        return { character: char, isShown: false };
      });
      setLetters(letterArray);
    }
  }, [word]);

  if (result) {
    return (
      <div>
        <h1>Hangman word: {word}</h1>
        <h2>Result: {result}</h2>
        <button className="button" onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  } else {
    return (
      <div className="sections">
        <div className="section" style={{ width: "70%" }}>
          <h1>Hangman</h1>
          <Letters letters={letters} />
          <Guess onGuess={onGuessLetter} />
        </div>
        <Guesses guesses={guesses} attempts={attempts} />
      </div>
    );
  }
};
