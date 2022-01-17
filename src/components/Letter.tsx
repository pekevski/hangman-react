import { HangmanLetter } from "../model/HangmanLetter";

type LetterProps = {
  show: boolean;
  letter: string;
};

export const Letter = (props: LetterProps): JSX.Element => {
  if (props.show) {
    return <span className="letter correct">{props.letter}</span>;
  } else {
    return <span className="letter">?</span>;
  }
};

type LettersProps = {
  letters: Array<HangmanLetter>;
};

export const Letters = (props: LettersProps): JSX.Element => {
  if (!props.letters.length) {
    return <h1>Wrapping rope around someones neck...</h1>;
  }

  return (
    <>
      {props.letters.map((value, index) => (
        <Letter key={index} letter={value.character} show={value.isShown} />
      ))}
    </>
  );
};
