import {
  useState,
  useRef,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import styled, { css } from "styled-components";
import { HangmanGuessResult } from "../model/HangmanGuess";
import { H1, H3, LetterStyle, Paragraph, Section } from "./Layout";

type GuessProps = {
  onGuess: (guessedLetter: string) => void;
};

const GuessTitle = styled(H1)`
  margin-right: 0.5rem;
`
const GuessInput = styled.input`
  ${LetterStyle}
  width: 1ch;
`

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
    <>
      <Section horizontal>
        <GuessTitle>Guess:</GuessTitle>
        <GuessInput
          autoFocus
          ref={inputEl}
          value={value}
          onChange={onGuessChange}
          onKeyDown={handleKeyDown}
          maxLength={2}
        />
      </Section>
      <Paragraph>{(value === "") ? "Guess a letter by typing one." : "Press Enter to guess letter."}</Paragraph>
    </>
  );
};

type GuessesProps = {
  guesses: Array<HangmanGuessResult>;
  attempts: number;
};

type GuessResultProps = {
  isCorrect: boolean;
}

const GuessResult = styled.h3<GuessResultProps>`
  margin-right: 1rem;

  ${props => props.isCorrect && css`
    color: darkgreen;
  `}

  ${props => !props.isCorrect && css`
    color: salmon;
  `}
`

export const Guesses = (props: GuessesProps): JSX.Element => {
  return (
    <Section horizontal={false}>
      <H3>Attempts Remaining: {props.attempts}</H3>
      <Section horizontal={true}>
        {props.guesses.map((guess, index) => {
          return (
            <GuessResult isCorrect={guess.isCorrect} key={index}>
              {guess.character.toUpperCase()} {guess.isCorrect ? "✅" : "❌"}
            </GuessResult>
          );
        })}
      </Section>
    </Section>
  );
};