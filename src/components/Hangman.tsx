import { useState, useEffect, MouseEventHandler } from "react";

import { Guesses, Guess } from "./Guess";
import { Letters } from "./Letter";
import { getRandomWord, checkResult } from "../services/WordService";
import { HangmanLetter } from "../model/HangmanLetter";
import { HangmanGuessResult } from "../model/HangmanGuess";
import { Container, H1, Section } from "./Layout";
import { Result } from "./Result";

export const Hangman = (): JSX.Element => {
  const [word, setWord] = useState<string>("");
  const [letters, setLetters] = useState<Array<HangmanLetter>>([]);
  const [guesses, setGuesses] = useState<Array<HangmanGuessResult>>([]);
  const [attempts, setAttempts] = useState<number>(6);

  // Helper method for word state
  async function getWord(): Promise<void> {
    let word = await getRandomWord();
    setWord(word);
    setAttempts(6);
  }

  // Retry Button handler
  const handleRetry: MouseEventHandler<HTMLButtonElement> = () => {
    // triggers fetch a new word
    setLetters([]);
    setGuesses([]);
    getWord();
  };

  // Letter submit handler
  const onGuessLetter = (guessedLetter: string): void => {
    let guess = guessedLetter.toLowerCase();

    // console.log(`guess: ${guess}`);

    // when this is a new guess lets do something with it
    // otherwise we wont calculate it
    if (guesses.some((g) => g.character === guess)) {
      return;
    }

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
    }

    // Add our guess to the list
    setGuesses(guesses.concat({ character: guess, isCorrect: correct }));
  };

  // Inital state onMount
  useEffect(() => {
    // console.log("useEffect WORD");
    getWord();
  }, []);

  // Runs on word change
  useEffect(() => {
    if (word) {
      // console.log("useEffect LETTERS");
      const letterArray = word.split("").map((char) => {
        return { character: char, isShown: false };
      });
      setLetters(letterArray);
    }
  }, [word]);

  // Check for the game result on each render
  const result = checkResult(letters, attempts);

  if (result) {
    return (
      <Result word={word} result={result} onRetry={handleRetry} />
    );
  } else {
    return (
      <Container>
        <Section horizontal={false}>
          <H1>Hangman</H1>
          <Letters letters={letters} />
          <Guess onGuess={onGuessLetter} />
        </Section>
        <Guesses guesses={guesses} attempts={attempts} />
      </Container>
    );
  }
};
